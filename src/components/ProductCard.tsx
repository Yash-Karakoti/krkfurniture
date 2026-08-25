import { Link } from "@tanstack/react-router";
import { formatPrice, refCode, type Product } from "@/data/products";
import { WhatsAppButton } from "./WhatsAppButton";
import { WishlistHeart } from "./WishlistHeart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden"
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <WishlistHeart
          productId={product.id}
          productName={product.name}
          className="absolute right-3 top-3"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="label-mono text-brass">{refCode(product)}</p>
          <h3 className="mt-1.5 font-display text-lg leading-snug">
            <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="font-mono text-sm text-foreground/80">{formatPrice(product.price)}</p>
        <WhatsAppButton productName={product.name} className="mt-auto w-full" />
      </div>
    </article>
  );
}
