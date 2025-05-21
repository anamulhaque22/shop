"use client";

import MyInfo from "@/components/UserProfile/Profile/MyInfo";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";

function MyProfile() {
  return <MyInfo />;
}

export default withPageRequiredAuth(MyProfile);
