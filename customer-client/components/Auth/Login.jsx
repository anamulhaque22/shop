import Image from "next/image";

import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthLoginService } from "@/services/api/services/auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../Input/InputText";
import LoginWithSocial from "./LoginWithSocial";
import PasswordInput from "./PasswordInput";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { setUser } = useAuthActions();
  const fetchAuthLogin = useAuthLoginService();
  const { setTokensInfo } = useAuthTokens();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchAuthLogin(formData);

    if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
      Object.keys(data.errors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: data.errors[key],
        });
      });
      return;
    }

    if (status === HTTP_CODES.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
  });
  return (
    <div className="relative">
      <div className="absolute w-2/5 left-0 top-0 hidden md:block">
        <Image
          src={"/images/sign-in.png"}
          width={599}
          height={500}
          alt="sign up"
          className="w-full h-[calc(100vh_-_95px)] object-fill"
        />
      </div>

      <div className="container flex justify-center md:justify-start md:flex-row-reverse">
        <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
          <h3 className="font-core-sans-bold font-bold text-2xl md:text-3xl mb-3">
            Sign In Page
          </h3>

          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-y-5 md:gap-y-7"
              onSubmit={onSubmit}
            >
              <InputText
                type="text"
                name="email"
                placeholder={""}
                labelTitle="User name or email address"
                containerStyle="mt-0 "
                labelStyle=""
              />

              <div>
                <PasswordInput />
                <div className="flex flex-row-reverse">
                  <Link
                    href="/reset-password"
                    className="underline text-base font-causten-regular"
                  >
                    Forget your password
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white disabled:bg-slate-600 disabled:border-slate-600"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>

                <div className="text-base font-causten-regular mt-3 flex">
                  <p>Don{"'"}t have an account?</p>
                  <Link href="/register" className="underline">
                    Sing up
                  </Link>
                </div>
              </div>
            </form>
          </FormProvider>

          <div className="divider font-core-sans-medium text-lg text-[#666666] mt-7 mb-6 md:my-10">
            OR
          </div>
          <LoginWithSocial />
        </div>
      </div>
    </div>
  );
}
