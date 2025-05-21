"use client";
import Loading from "@/components/Loading/Loading";
import EmptyWithList from "@/components/UserProfile/WishList/EmptyWithList";
import WishListItem from "@/components/UserProfile/WishList/WishListItem";
import { useWishlist } from "@/context/wish-list/use-wish-list";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";

function WishListContent() {
  const { wishlist, toggleWishlist, loading } = useWishlist();

  if (loading) return <Loading isLoading={loading} />;

  return (
    <>
      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 custom-shadow p-4 sm:py-6 sm:px-5 rounded-lg gap-5">
          {wishlist.map((wishList) => (
            <WishListItem
              key={wishList.id}
              wishList={wishList}
              toggleWishlist={(product) => toggleWishlist(product)}
            />
          ))}
        </div>
      ) : (
        <EmptyWithList />
      )}
    </>
  );
}

export default withPageRequiredAuth(WishListContent);
