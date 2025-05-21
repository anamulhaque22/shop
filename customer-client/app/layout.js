import SnackbarProvider from "@/components/snackbar-provider";

import { CartProvider } from "@/context/cart/CartProvider";
import { WishlistProvider } from "@/context/wish-list/wish-list-provider";
import AuthProvider from "@/services/auth/auth-provider";
import queryClient from "@/services/react-query/query-client";
import QueryClientProvider from "@/services/react-query/query-client-provider";
import FacebookAuthProvider from "@/services/social-auth/facebook/facebook-auth-provider";
import GoogleAuthProvider from "@/services/social-auth/google/google-auth-provider";
import font from "./font";
import "./globals.css";

function conbineFontVariable(font) {
  let fontVariable = "";
  for (const key in font) {
    fontVariable += `${font[key].variable} `;
  }
  return fontVariable;
}

export const generateMetadata = () => {
  return {
    title: "Euphoria Fashion",
    description: "Euphoria Fashion is a fashion store",
  };
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${conbineFontVariable(font)}  bg-white`}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
            <AuthProvider>
              <GoogleAuthProvider>
                <FacebookAuthProvider>
                  <CartProvider>
                    <WishlistProvider>{children}</WishlistProvider>
                  </CartProvider>
                </FacebookAuthProvider>
              </GoogleAuthProvider>
            </AuthProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
