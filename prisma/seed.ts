/**
 * Seed script — inserts the original mock products into the Neon database.
 *
 * Run with: npx tsx prisma/seed.ts
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const products = [
  {
    id: "krk-001",
    name: "Marlow Wingback Chair",
    price: 32500,
    category: "Chairs",
    image_url: "/assets/chair-1.jpg",
  },
  {
    id: "krk-002",
    name: "Teakwood Accent Chair",
    price: null,
    category: "Chairs",
    image_url: "/assets/chair-2.jpg",
  },
  {
    id: "krk-003",
    name: "Kovalam Cane Lounge Chair",
    price: 24800,
    category: "Chairs",
    image_url: "/assets/chair-3.jpg",
  },
  {
    id: "krk-004",
    name: "Ashcroft Reading Chair",
    price: 19900,
    category: "Chairs",
    image_url: "/assets/chair-1.jpg",
  },
  {
    id: "krk-005",
    name: "Nilgiri Rattan Armchair",
    price: null,
    category: "Chairs",
    image_url: "/assets/chair-3.jpg",
  },
  {
    id: "krk-006",
    name: "Bramwell 3-Seater Sofa",
    price: 78500,
    category: "Sofas",
    image_url: "/assets/sofa-1.jpg",
  },
  {
    id: "krk-007",
    name: "Verona L-Shaped Sofa",
    price: null,
    category: "Sofas",
    image_url: "/assets/sofa-2.jpg",
  },
  {
    id: "krk-008",
    name: "Halston Loveseat",
    price: 46200,
    category: "Sofas",
    image_url: "/assets/sofa-3.jpg",
  },
  {
    id: "krk-009",
    name: "Coorg Linen Settee",
    price: 54000,
    category: "Sofas",
    image_url: "/assets/sofa-1.jpg",
  },
  {
    id: "krk-010",
    name: "Ellory Velvet Sectional",
    price: null,
    category: "Sofas",
    image_url: "/assets/sofa-2.jpg",
  },
];

async function main() {
  console.log("Seeding products...");

  for (const product of products) {
    await prisma.products.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        category: product.category,
        image_url: product.image_url,
      },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image_url: product.image_url,
      },
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log(`\nDone — ${products.length} products seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
