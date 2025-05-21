"use client";
import { useCallback, useEffect, useMemo } from "react";
import { facebookAppId, isFacebookAuthEnabled } from "./facebook-config";
import { FacebookContext } from "./facebook-context";

// Add new languages here
const languageToCode = "en_US";

function FacebookProvider({ children }) {
  useEffect(() => {
    window.fbAsyncInit = function () {
      if (facebookAppId) {
        window.FB.init({
          appId: facebookAppId,
          cookie: true,
          xfbml: true,
          version: "v11.0",
        });
      } else {
        throw Error("Facebook App ID not found");
      }
    };

    const scriptTag = document.createElement("script");
    scriptTag.src = `https://connect.facebook.net/${languageToCode}/sdk.js`;
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.crossOrigin = "anonymous";

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [languageToCode]);

  const login = useCallback(() => {
    return new Promise((resolve, reject) => {
      window.FB.login((response) => {
        if (response.authResponse) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }, []);

  const valueContext = useMemo(() => ({ login }), [login]);

  return (
    <FacebookContext.Provider value={valueContext}>
      {children}
    </FacebookContext.Provider>
  );
}

export default function FacebookAuthProvider({ children }) {
  return isFacebookAuthEnabled ? (
    <FacebookProvider>{children}</FacebookProvider>
  ) : (
    children
  );
}
