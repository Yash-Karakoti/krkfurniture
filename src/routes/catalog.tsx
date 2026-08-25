import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";

type CatalogSearch = { category?: string | undefined };

export const Route = createFileRoute("/catalog")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    const raw = search["category"];
    return typeof raw === "string" ? { category: raw } : {};
  },
  head: () => ({
    meta: [
      { title: "Catalog — Chairs and Sofas | KRK Furniture" },
      {
        name: "description",
        content:
          "Browse every chair and sofa on the KRK Furniture floor. Filter by category and enquire on WhatsApp about any piece.",
      },
      { property: "og:title", content: "Catalog — Chairs and Sofas | KRK Furniture" },
      {
        property: "og:description",
        content: "Browse every chair and sofa on the KRK Furniture floor.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { category } = Route.useSearch();
  const visible = category ? products.filter((p) => p.category === category) : products;

  const filters: { label: string; value?: string | undefined }[] = [
    { label: "All pieces", value: undefined },
    ...categories.map((c) => ({ label: c, value: c })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="label-mono text-brass">Catalog</p>
      <h1 className="mt-2 text-4xl">{category ?? "Everything on the floor"}</h1>
      <p className="mt-3 max-w-xl text-foreground/75">
        Sorted newest first. Prices shown where they're fixed; the rest depend on fabric, size and
        finish — ask us on WhatsApp.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-brass/30 pb-6">
        {filters.map((filter) => (
          <Link
            key={filter.label}
            to="/catalog"
            search={filter.value ? { category: filter.value } : {}}
            className={cn(
              "label-mono rounded-sm border px-4 py-2 transition-colors",
              filter.value === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/70 hover:border-brass",
            )}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => (
          <Reveal key={product.id} delay={Math.min(index, 5) * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
