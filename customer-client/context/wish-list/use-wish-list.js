import { useContext } from "react";
import { WishlistContext } from "./wish-list-context";

export const useWishlist = () => {
  return useContext(WishlistContext);
};
