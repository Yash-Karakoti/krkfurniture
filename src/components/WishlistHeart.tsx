import { Heart } from "lucide-react";
import { useShowroom } from "@/lib/showroom-state";
import { cn } from "@/lib/utils";

export function WishlistHeart({
  productId,
  productName,
  className,
}: {
  productId: string;
  productName: string;
  className?: string;
}) {
  const { isSaved, toggleSaved } = useShowroom();
  const saved = isSaved(productId);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(productId);
      }}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-border bg-ivory/90 backdrop-blur transition-colors hover:border-primary",
        className,
      )}
    >
      <Heart
        className={cn("size-4 transition-colors", saved ? "fill-primary text-primary" : "text-foreground/70")}
      />
    </button>
  );
}
