import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { prisma } from "@/lib/db";
import type { WishlistItem } from "@/data/products";

/** Helper — throws if the user is not signed in. */
async function requireUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

/**
 * Fetch the signed-in user's wishlist items (product_id + saved_at).
 * Requires authentication.
 */
export const getWishlistFn = createServerFn().handler(async () => {
  const userId = await requireUserId();

  const rows = await prisma.wishlist.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    select: { product_id: true, created_at: true },
  });

  return rows.map((r): WishlistItem => ({
    product_id: r.product_id,
    saved_at: (r.created_at ?? new Date()).toISOString(),
  }));
});

/**
 * Add a product to the signed-in user's wishlist.
 * Silently ignores duplicates (ON CONFLICT DO NOTHING via upsert).
 */
export const addToWishlistFn = createServerFn()
  .validator((data: { productId: string }) => data)
  .handler(async ({ data }) => {
    const userId = await requireUserId();

    await prisma.wishlist.upsert({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: data.productId,
        },
      },
      update: {},
      create: {
        user_id: userId,
        product_id: data.productId,
      },
    });

    return { ok: true };
  });

/**
 * Remove a product from the signed-in user's wishlist.
 * No-op if it doesn't exist.
 */
export const removeFromWishlistFn = createServerFn()
  .validator((data: { productId: string }) => data)
  .handler(async ({ data }) => {
    const userId = await requireUserId();

    await prisma.wishlist.deleteMany({
      where: {
        user_id: userId,
        product_id: data.productId,
      },
    });

    return { ok: true };
  });
