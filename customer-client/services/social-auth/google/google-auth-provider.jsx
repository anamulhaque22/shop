"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId, isGoogleAuthEnabled } from "./google-config";

function GoogleAuthProvider({ children }) {
  return isGoogleAuthEnabled && googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  ) : (
    children
  );
}

export default GoogleAuthProvider;
