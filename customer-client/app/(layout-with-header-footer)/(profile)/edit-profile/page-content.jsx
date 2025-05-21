"use client";
import EditProfile from "@/components/UserProfile/EditProfile/EditProfile";
import UpdatePassword from "@/components/UserProfile/EditProfile/UpdatePassword";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";

function EditProfileContent() {
  return (
    <div className="custom-shadow py-6 px-5 rounded-lg">
      <EditProfile />
      <UpdatePassword />
    </div>
  );
}

export default withPageRequiredAuth(EditProfileContent);
