"use client";

import useToast from "@/hooks/useToast";
import HTTP_CODES from "@/services/api/constants/http-codes";
import {
  useAddToWishListService,
  useGetWishListService,
  useRemoveFromWishListService,
} from "@/services/api/services/wish-list";
import useAuth from "@/services/auth/use-auth";
import { useEffect, useState } from "react";
import { WishlistContext } from "./wish-list-context";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const fetchWishlist = useGetWishListService();
  const fetchPostWishlist = useAddToWishListService();
  const fetchDeleteWishlist = useRemoveFromWishListService();
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const { isLoaded } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, status } = await fetchWishlist();
        if (status === HTTP_CODES.OK) {
          setWishlist(data);
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };
    if (typeof window !== "undefined" && isLoaded) {
      fetchData();
    }
  }, [fetchWishlist, isLoaded]);

  // Helper function to check if a product is in the wishlist
  const isInWishlist = (productId) =>
    wishlist.find((w) => w?.product?.id === productId);

  const toggleWishlist = async (product) => {
    const exitsWishItem = isInWishlist(product?.id);
    if (exitsWishItem) {
      setLoading(true);
      const { data, status } = await fetchDeleteWishlist(exitsWishItem.id);
      if (status === HTTP_CODES.NO_CONTENT) {
        showToast("Product removed from wishlist", "success");
        setWishlist((prev) =>
          prev.filter((item) => item?.product?.id !== product?.id)
        );
        setLoading(false);
      }
    } else {
      setLoading(true);
      const { data, status } = await fetchPostWishlist(product?.id);
      if (status === HTTP_CODES.CREATED) {
        setLoading(false);
        showToast("Product added to wishlist", "success");
        setWishlist((prev) => [...prev, data]);
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, toggleWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
