import chair1 from "@/assets/chair-1.jpg";
import chair2 from "@/assets/chair-2.jpg";
import chair3 from "@/assets/chair-3.jpg";
import sofa1 from "@/assets/sofa-1.jpg";
import sofa2 from "@/assets/sofa-2.jpg";
import sofa3 from "@/assets/sofa-3.jpg";

/** Mock shape mirrors the future database table exactly. */
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

/** Newest first — the catalog's default order. */
export const products: Product[] = [
  {
    id: "krk-001",
    name: "Marlow Wingback Chair",
    price: 32500,
    category: "Chairs",
    image_url: chair1,
  },
  {
    id: "krk-002",
    name: "Teakwood Accent Chair",
    price: null,
    category: "Chairs",
    image_url: chair2,
  },
  {
    id: "krk-003",
    name: "Kovalam Cane Lounge Chair",
    price: 24800,
    category: "Chairs",
    image_url: chair3,
  },
  {
    id: "krk-004",
    name: "Ashcroft Reading Chair",
    price: 19900,
    category: "Chairs",
    image_url: chair1,
  },
  {
    id: "krk-005",
    name: "Nilgiri Rattan Armchair",
    price: null,
    category: "Chairs",
    image_url: chair3,
  },
  {
    id: "krk-006",
    name: "Bramwell 3-Seater Sofa",
    price: 78500,
    category: "Sofas",
    image_url: sofa1,
  },
  {
    id: "krk-007",
    name: "Verona L-Shaped Sofa",
    price: null,
    category: "Sofas",
    image_url: sofa2,
  },
  {
    id: "krk-008",
    name: "Halston Loveseat",
    price: 46200,
    category: "Sofas",
    image_url: sofa3,
  },
  {
    id: "krk-009",
    name: "Coorg Linen Settee",
    price: 54000,
    category: "Sofas",
    image_url: sofa1,
  },
  {
    id: "krk-010",
    name: "Ellory Velvet Sectional",
    price: null,
    category: "Sofas",
    image_url: sofa2,
  },
];

export const categories: string[] = Array.from(
  new Set(products.map((p) => p.category)),
);

export const descriptions: Record<string, string> = {
  Chairs:
    "Built in our workshop from seasoned hardwood, hand-finished and upholstered to order. Fabric and stain can be changed — bring a swatch or pick from what's on the floor.",
  Sofas:
    "Kiln-dried frames, webbed seats, high-resilience foam wrapped in fibre. Made to the length you need, and carried up narrow stairs without drama.",
};

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function refCode(product: Product): string {
  return `Ref. ${product.id.replace("krk-", "KRK-")}`.toUpperCase().replace("REF.", "Ref.");
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Enquire for price";
  return `₹${price.toLocaleString("en-IN")}`;
}

/** Clearly-marked placeholder — swap for the real showroom number. */
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";

export function whatsappLink(productName: string): string {
  const message = `Hi, I'm interested in the ${productName}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
