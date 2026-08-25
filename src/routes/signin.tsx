import { createFileRoute, Link } from "@tanstack/react-router";
import { ElevationSketch } from "@/components/ElevationSketch";
import { useShowroom } from "@/lib/showroom-state";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in | KRK Furniture" },
      {
        name: "description",
        content: "Sign in to keep your saved pieces together across visits to the KRK Furniture catalog.",
      },
      { property: "og:title", content: "Sign in | KRK Furniture" },
      { property: "og:description", content: "Keep your saved pieces together across visits." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const { signedIn, signIn, signOut } = useShowroom();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
      <ElevationSketch variant="chair" className="w-40 text-brass" />
      <h1 className="mt-6 text-3xl">{signedIn ? "You're signed in" : "Sign in to KRK"}</h1>
      <p className="mt-3 text-foreground/75">
        {signedIn
          ? "Your wishlist stays with this session while we finish wiring up real accounts."
          : "Signing in keeps your saved pieces together. Nothing else — we don't sell online."}
      </p>

      {signedIn ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/wishlist"
            className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            View your wishlist
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="label-mono text-foreground/60 hover:text-primary"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={signIn}
          className="mt-8 inline-flex items-center gap-3 rounded-sm border border-border bg-card px-6 py-3.5 text-sm font-medium transition-colors hover:border-brass"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 01-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0012 24z" />
            <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 010-4.6V6.7H1.4a12 12 0 000 10.7l4-3z" />
            <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
          </svg>
          Sign in with Google
        </button>
      )}

      <p className="label-mono mt-10 text-foreground/45">
        Mock sign-in — real accounts get wired up later
      </p>
    </div>
  );
}
