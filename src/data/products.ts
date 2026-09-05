/**
 * Product & wishlist types + display helpers.
 *
 * The static products array has been removed — all data now comes from the
 * Neon Postgres database via the server functions in src/server/products.ts.
 *
 * Types, formatters, and WhatsApp helpers are kept here because they are
 * imported by components that render on the client.
 */

/** Shape identical to the `products` database table. */
export type Product = {
  id: string;
  name: string;
  /** null means the piece is quoted on enquiry */
  price: number | null;
  category: string;
  image_url: string;
};

export type WishlistItem = {
  product_id: string;
  saved_at: string;
};

export const descriptions: Record<string, string> = {
  Chairs:
    "Built in our workshop from seasoned hardwood, hand finished and upholstered to order. Fabric and stain can be changed - bring a swatch or pick from what's on the floor.",
  Sofas:
    "Designed for lasting comfort with solid hardwood frames and premium cushioning. Fully customizable in length, fabric, and configuration to perfectly suit your living space.",
};

export function refCode(product: Product): string {
  return `Ref. ${product.id.replace("krk-", "KRK-")}`.toUpperCase().replace("REF.", "Ref.");
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Enquire for price";
  return `₹${price.toLocaleString("en-IN")}`;
}

/** Clearly-marked placeholder — swap for the real showroom number. */
export const WHATSAPP_NUMBER = "919891849001";

export function whatsappLink(productName: string): string {
  const message = `Hello, I'm interested in the ${productName}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
