import { createFileRoute, Link } from "@tanstack/react-router";
import { ElevationSketch } from "@/components/ElevationSketch";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProductsFn, getCategoriesFn } from "@/server/products";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, categories] = await Promise.all([
      getProductsFn({ data: {} }),
      getCategoriesFn(),
    ]);
    return { products, categories };
  },
  head: () => ({
    meta: [
      { title: "KRK Furniture — Chairs and Sofas Showroom" },
      {
        name: "description",
        content:
          "A working furniture showroom in India. Browse chairs and sofas, save what you like, and enquire on WhatsApp — no cart, no checkout.",
      },
      { property: "og:title", content: "KRK Furniture — Chairs and Sofas Showroom" },
      {
        property: "og:description",
        content: "Browse chairs and sofas, then enquire on WhatsApp.",
      },
    ],
  }),
  component: Home,
});

const sketchFor = (category: string) =>
  category.toLowerCase().startsWith("sofa") ? ("sofa" as const) : ("chair" as const);

function Home() {
  const { products, categories } = Route.useLoaderData();
  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="relative isolate">
        <img
          src="/assets/hero.jpg"
          alt="A rust velvet wingback chair in the KRK showroom, lit by afternoon sun"
          width={1920}
          height={1088}
          className="w-full h-auto min-h-[500px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-teak/45" />
        <div className="absolute inset-0 flex items-center pb-24">
          <div className="relative mx-auto w-full max-w-6xl px-5">
            <ElevationSketch
              variant="chair"
              className="pointer-events-none absolute -top-16 left-2 w-[26rem] max-w-[70%] text-brass opacity-20"
            />
            <div className="relative max-w-xl md:max-w-2xl">
              <p className="label-mono text-brass text-lg">Showroom catalog</p>
              <h1 className="mt-4 text-6xl leading-[1.05] text-canvas sm:text-7xl">
                Furniture you sit in before you decide.
              </h1>
              <p className="mt-6 max-w-md text-lg text-canvas/90">
                Chairs and sofas built and finished for our floor. Save what you like, then message
                us about it.
              </p>
              <Link
                to="/catalog"
                search={{}}
                className="mt-10 inline-flex rounded-sm bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse the catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, index) => {
            const count = products.filter((p) => p.category === category).length;
            return (
              <Reveal key={category} delay={index * 80}>
                <Link
                  to="/catalog"
                  search={{ category }}
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-sm border border-brass/40 bg-card p-8 transition-colors hover:border-primary"
                >
                  <ElevationSketch
                    variant={sketchFor(category)}
                    className="absolute inset-x-8 top-6 h-40 text-brass opacity-60 transition-opacity group-hover:opacity-90"
                  />
                  <p className="label-mono text-brass">{count} pieces</p>
                  <h2 className="mt-2 text-3xl group-hover:text-primary">{category}</h2>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-3">
          <div>
            <p className="label-mono text-brass">01 - Made here</p>
            <h3 className="mt-3 text-xl">Our own workshop</h3>
            <p className="mt-2 text-foreground/75">
              Frames are cut, joined and finished by the same team that stands on the floor. If a
              joint fails, we know who made it.
            </p>
          </div>
          <div>
            <p className="label-mono text-brass">02 - Delivered to your door</p>
            <h3 className="mt-3 text-xl">Delhi NCR delivery</h3>
            <p className="mt-2 text-foreground/75">
              We deliver every piece across Delhi NCR, safely and directly to your home. Share your location with us and we'll confirm the delivery details.
            </p>
          </div>
          <div>
            <p className="label-mono text-brass">03 - Straight answers</p>
            <h3 className="mt-3 text-xl">One conversation</h3>
            <p className="mt-2 text-foreground/75">
              Every enquiry goes directly to WhatsApp and reaches the owner. Have a quick conversation about your interests and requirements.
              centre.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">Recently on the floor</h2>
          <Link to="/catalog" search={{}} className="label-mono text-brass hover:text-primary">
            See all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
