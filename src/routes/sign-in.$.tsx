import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in/$")({
  head: () => ({
    meta: [
      { title: "Sign in | KRK Furniture" },
      {
        name: "description",
        content:
          "Sign in to keep your saved pieces together across visits to the KRK Furniture catalog.",
      },
      { property: "og:title", content: "Sign in | KRK Furniture" },
      { property: "og:description", content: "Keep your saved pieces together across visits." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="flex items-center justify-center py-16 md:py-24">
      <SignIn />
    </div>
  );
}
