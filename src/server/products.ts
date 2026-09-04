import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/lib/db";
import type { Product } from "@/data/products";

/**
 * Fetch all products, optionally filtered by category.
 * Public — no auth required.
 */
export const getProductsFn = createServerFn()
  .validator((data: { category?: string }) => data)
  .handler(async ({ data }) => {
    const rows = await prisma.products.findMany({
      ...(data.category ? { where: { category: data.category } } : {}),
      orderBy: { created_at: "desc" },
    });

    return rows.map(toProduct);
  });

/**
 * Fetch a single product by ID.
 * Public — no auth required.
 */
export const getProductFn = createServerFn()
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const row = await prisma.products.findUnique({
      where: { id: data.id },
    });

    return row ? toProduct(row) : null;
  });

/**
 * Fetch all distinct categories from the products table.
 * Public — no auth required.
 */
export const getCategoriesFn = createServerFn().handler(async () => {
  const rows = await prisma.products.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });

  return rows.map((r) => r.category).filter((c): c is string => c !== null);
});

/** Map a Prisma row to the existing Product shape. */
function toProduct(row: {
  id: string;
  name: string;
  price: unknown;
  category: string | null;
  image_url: string | null;
}): Product {
  return {
    id: row.id,
    name: row.name,
    price: row.price !== null ? Number(row.price) : null,
    category: row.category ?? "",
    image_url: row.image_url ?? "",
  };
}
