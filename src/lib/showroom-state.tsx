import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useAuth, useClerk } from "@clerk/tanstack-react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { WishlistItem } from "@/data/products";
import { getWishlistFn, addToWishlistFn, removeFromWishlistFn } from "@/server/wishlist";

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
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const queryClient = useQueryClient();

  const signedIn = isSignedIn ?? false;

  // Fetch wishlist from the server when signed in
  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlistFn(),
    enabled: signedIn,
    staleTime: 30_000,
  });

  const addMutation = useMutation({
    mutationFn: (productId: string) => addToWishlistFn({ data: { productId } }),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previous = queryClient.getQueryData<WishlistItem[]>(["wishlist"]);
      queryClient.setQueryData<WishlistItem[]>(["wishlist"], (old = []) => [
        ...old,
        { product_id: productId, saved_at: new Date().toISOString() },
      ]);
      return { previous };
    },
    onError: (_err, _productId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["wishlist"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => removeFromWishlistFn({ data: { productId } }),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previous = queryClient.getQueryData<WishlistItem[]>(["wishlist"]);
      queryClient.setQueryData<WishlistItem[]>(["wishlist"], (old = []) =>
        old.filter((item) => item.product_id !== productId),
      );
      return { previous };
    },
    onError: (_err, _productId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["wishlist"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const toggleSaved = useCallback(
    (productId: string) => {
      if (!signedIn) {
        clerk.redirectToSignIn();
        return;
      }
      const alreadySaved = wishlist.some((item) => item.product_id === productId);
      if (alreadySaved) {
        removeMutation.mutate(productId);
      } else {
        addMutation.mutate(productId);
      }
    },
    [signedIn, wishlist, addMutation, removeMutation, clerk],
  );

  const value = useMemo<ShowroomState>(
    () => ({
      signedIn,
      signIn: () => clerk.redirectToSignIn(),
      signOut: () => {
        queryClient.removeQueries({ queryKey: ["wishlist"] });
        clerk.signOut();
      },
      wishlist,
      isSaved: (productId) => wishlist.some((item) => item.product_id === productId),
      toggleSaved,
    }),
    [signedIn, wishlist, toggleSaved, clerk, queryClient],
  );

  return <ShowroomContext.Provider value={value}>{children}</ShowroomContext.Provider>;
}

export function useShowroom(): ShowroomState {
  const context = useContext(ShowroomContext);
  if (!context) throw new Error("useShowroom must be used inside ShowroomProvider");
  return context;
}
