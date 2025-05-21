"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./use-auth";

function withPageRequiredAuth(Component) {
  return function WithPageRequiredAuth(props) {
    const router = useRouter();
    const { user, isLoaded } = useAuth();

    useEffect(() => {
      const check = () => {
        if ((user && user?.role?.id && user?.role?.id === 1) || !isLoaded)
          // admin role id is 1
          return;

        const currentLocation = window.location.toString();

        const returnToPath =
          currentLocation.replace(new URL(currentLocation).origin, "") || "/";
        const params = new URLSearchParams({
          returnTo: returnToPath,
        });

        let redirectTo = `/login?${params.toString()}`;

        if (user) redirectTo = "/";

        router.replace(redirectTo);
      };
      check();
    }, [user, isLoaded, router]);

    return user && user?.role?.id && user?.role?.id === 1 ? (
      <Component {...props} />
    ) : null;
  };
}

export default withPageRequiredAuth;
