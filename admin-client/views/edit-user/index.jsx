"use client";

import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import EditUserForm from "./components/EditUserForm";
import UserPasswordChangeForm from "./components/UserPasswordChangeForm";

function EditUser() {
  return (
    <div className="pt-8 px-6">
      <EditUserForm />
      <UserPasswordChangeForm />
    </div>
  );
}

export default withPageRequiredAuth(EditUser);
