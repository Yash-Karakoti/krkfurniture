import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { WishlistItem } from "@/data/products";

type ShowroomState = {
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  wishlist: WishlistItem[];
  isSaved: (productId: string) => boolean;
  toggleSaved: (productId: string) => void;
};

const ShowroomContext = createContext<ShowroomState | null>(null);

export function ShowroomProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const toggleSaved = useCallback((productId: string) => {
    setWishlist((current) =>
      current.some((item) => item.product_id === productId)
        ? current.filter((item) => item.product_id !== productId)
        : [...current, { product_id: productId, saved_at: new Date().toISOString() }],
    );
  }, []);

  const value = useMemo<ShowroomState>(
    () => ({
      signedIn,
      signIn: () => setSignedIn(true),
      signOut: () => setSignedIn(false),
      wishlist,
      isSaved: (productId) => wishlist.some((item) => item.product_id === productId),
      toggleSaved,
    }),
    [signedIn, wishlist, toggleSaved],
  );

  return <ShowroomContext.Provider value={value}>{children}</ShowroomContext.Provider>;
}

export function useShowroom(): ShowroomState {
  const context = useContext(ShowroomContext);
  if (!context) throw new Error("useShowroom must be used inside ShowroomProvider");
  return context;
}
