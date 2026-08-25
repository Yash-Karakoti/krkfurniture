import { createFileRoute, Link } from "@tanstack/react-router";
import { ElevationSketch } from "@/components/ElevationSketch";
import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/data/products";
import { useShowroom } from "@/lib/showroom-state";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your wishlist | KRK Furniture" },
      {
        name: "description",
        content: "The chairs and sofas you've saved from the KRK Furniture catalog, ready to enquire about.",
      },
      { property: "og:title", content: "Your wishlist | KRK Furniture" },
      { property: "og:description", content: "The pieces you've saved from the KRK Furniture catalog." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { signedIn, wishlist } = useShowroom();

  if (!signedIn) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
        <ElevationSketch variant="sofa" className="w-48 text-brass" />
        <h1 className="mt-6 text-3xl">Sign in to see your wishlist</h1>
        <p className="mt-3 text-foreground/75">
          Saved pieces live with your account, so we keep this page behind sign-in.
        </p>
        <Link
          to="/signin"
          className="mt-8 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const saved = [...wishlist]
    .sort((a, b) => b.saved_at.localeCompare(a.saved_at))
    .map((item) => getProduct(item.product_id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="label-mono text-brass">Your account</p>
      <h1 className="mt-2 text-4xl">Saved pieces</h1>

      {saved.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <ElevationSketch variant="chair" className="w-56 text-brass" />
          <p className="mt-6 max-w-sm text-foreground/75">
            Nothing saved yet — tap the heart on any piece to add it here.
          </p>
          <Link
            to="/catalog"
            search={{}}
            className="mt-6 rounded-sm border border-border px-6 py-3 text-sm hover:border-brass"
          >
            Browse the catalog
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
