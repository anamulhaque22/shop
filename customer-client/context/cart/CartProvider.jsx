"use client";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CartContext } from "./cart-context";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
  }, []);

  const setCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const pIndex = prev.findIndex(
        (p) =>
          p.productId === product.productId &&
          p.color.id === product.color.id &&
          p.size.id === product.size.id
      );

      if (pIndex !== -1) {
        enqueueSnackbar("Product already in cart", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        return prev;
      } else {
        setCartToLocalStorage([...prev, { ...product, quantity: 1 }]);
        enqueueSnackbar("Product is added to cart", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId, color, size) => {
    setCart((prev) => {
      const filteredCart = prev.filter(
        (p) =>
          !(
            p.productId === productId &&
            p.color.id === color.id &&
            p.size.id === size.id
          )
      );
      setCartToLocalStorage(filteredCart);
      return filteredCart;
    });
  };

  const updateQuantity = (productId, color, size, quantity) => {
    setCart((prev) => {
      const pIndex = prev.findIndex(
        (p) =>
          p.productId === productId &&
          p.color.id === color.id &&
          p.size.id === size.id
      );

      if (pIndex !== -1) {
        const newCart = [...prev];
        newCart[pIndex] = {
          ...newCart[pIndex],
          quantity: newCart[pIndex].quantity + quantity,
        };

        if (newCart[pIndex].quantity <= 0) {
          newCart.splice(pIndex, 1);
        }

        setCartToLocalStorage(newCart);
        return newCart;
      }

      return prev;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartToLocalStorage([]);
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const cartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalAmount,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
