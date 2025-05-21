"use client";

import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthGoogleLoginService } from "@/services/api/services/auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import Loading from "../Loading/Loading";

export default function GoogleAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const authGoogleLoginService = useAuthGoogleLoginService();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async (tokenResponse) => {
    if (!tokenResponse.credential) return;

    setIsLoading(true);
    const { status, data } = await authGoogleLoginService({
      idToken: tokenResponse.credential,
    });

    if (status === HTTP_CODES.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
    setIsLoading(false);
  };

  return (
    <>
      <GoogleLogin theme="outline" size="large" onSuccess={onSuccess} />
      <Loading isLoading={isLoading} />
    </>
  );
}
