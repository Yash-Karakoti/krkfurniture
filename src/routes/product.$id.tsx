import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WishlistHeart } from "@/components/WishlistHeart";
import { descriptions, formatPrice, getProduct, products, refCode } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece unavailable | KRK Furniture" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const description = `${product.name} — ${product.category.slice(0, -1)} from the KRK Furniture showroom. Enquire on WhatsApp.`;
    return {
      meta: [
        { title: `${product.name} | KRK Furniture` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} | KRK Furniture` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link
        to="/catalog"
        search={{ category: product.category }}
        className="label-mono text-brass hover:text-primary"
      >
        ← Back to {product.category}
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative overflow-hidden rounded-sm border border-border bg-card">
          <img
            src={product.image_url}
            alt={product.name}
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="lg:pt-4">
          <p className="label-mono text-brass">{refCode(product)}</p>
          <h1 className="mt-3 text-4xl leading-tight">{product.name}</h1>
          <p className="mt-4 font-mono text-lg">{formatPrice(product.price)}</p>

          <div className="rule-brass mt-8 pt-6">
            <p className="max-w-prose text-foreground/80">{descriptions[product.category]}</p>
            <p className="mt-4 max-w-prose text-foreground/80">
              Come sit in it before you decide. We deliver across the city and take care of the
              carry-up ourselves.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton productName={product.name} size="lg" />
            <WishlistHeart
              productId={product.id}
              productName={product.name}
              className="size-12"
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl">You might also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
