"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./use-auth";

function withPageRequiredGuest(Component) {
  return function WithPageRequiredGuest(props) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const check = () => {
        if (!user || !isLoaded) return;

        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get("returnTo") ?? "/";
        router.replace(returnTo);
      };
      check();
    }, [user, isLoaded, router]);

    return !user && isLoaded ? <Component {...props} /> : null;
  };
}

export default withPageRequiredGuest;
