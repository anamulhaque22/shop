import FacebookAuth from "./FacebookAuth";
import GoogleAuth from "./google-auth";

export default function LoginWithSocial() {
  return (
    <div className="grid content-stretch place-items-stretch grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-4">
      <GoogleAuth />
      <FacebookAuth />
    </div>
  );
}
