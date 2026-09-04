import { Link } from "@tanstack/react-router";
import { UserButton } from "@clerk/tanstack-react-start";
import { Heart } from "lucide-react";
import { useShowroom } from "@/lib/showroom-state";

/** Header nav categories — kept static to avoid a server call on every navigation. */
const categories = ["Chairs", "Sofas"];

export function SiteHeader() {
  const { signedIn, wishlist } = useShowroom();

  return (
    <header className="sticky top-0 z-40 bg-teak text-canvas">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-tight">
          KRK <span className="text-brass">Furniture</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-5 text-sm md:flex">
          {categories.map((category) => (
            <Link
              key={category}
              to="/catalog"
              search={{ category }}
              className="text-canvas/80 transition-colors hover:text-brass"
            >
              {category}
            </Link>
          ))}
          <Link
            to="/catalog"
            search={{}}
            className="text-canvas/80 transition-colors hover:text-brass"
          >
            All pieces
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {signedIn ? (
            <UserButton />
          ) : (
            <Link
              to="/sign-in/$"
              className="text-sm text-canvas/80 transition-colors hover:text-brass"
            >
              Sign in
            </Link>
          )}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative inline-flex size-9 items-center justify-center rounded-full border border-brass/40 transition-colors hover:border-brass"
          >
            <Heart className="size-4" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-primary px-1 text-center font-mono text-[10px] leading-5 text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-brass/40" />
      <nav className="flex gap-4 border-b border-brass/20 px-5 py-2 text-sm md:hidden">
        {categories.map((category) => (
          <Link key={category} to="/catalog" search={{ category }} className="text-canvas/80">
            {category}
          </Link>
        ))}
        <Link to="/catalog" search={{}} className="text-canvas/80">
          All
        </Link>
      </nav>
    </header>
  );
}
