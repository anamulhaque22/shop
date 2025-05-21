"use client";
import { ROLES } from "@/constants";
import useToast from "@/hooks/useToast";
import { useAuthLoginService } from "@/services/api/services/auth";
import HTTP_CODES from "@/services/api/types/http-codes";
import withPageRequiredGuest from "@/services/auth/page-with-required-guest";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../../components/Input/InputText";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const fetchAuthLogin = useAuthLoginService();
  const { setTokensInfo } = useAuthTokens();
  const { setUser } = useAuthActions();
  const showToast = useToast();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "anamul.ah00@gmail.com",
      password: "secret",
    },
  });

  const { handleSubmit, setError, reset } = methods;

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
      if (data?.user?.role?.id !== ROLES.ADMIN) {
        showToast(
          "Access Denied: You do not have the required permissions to access this page.",
          "error"
        );
        reset();
        return;
      }
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
  });
  return (
    <div className="bg-primary h-screen">
      <div className="card mx-auto flex justify-center items-center h-full">
        <div className="px-7 py-10 shadow-xl w-full max-w-lg rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-center text-text">
            Login (With Given Credentials)
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <InputText
                  type="text"
                  name="email"
                  placeholder={""}
                  labelTitle="Email address"
                  containerStyle="mt-0 "
                  labelStyle=""
                />

                <InputText
                  type="password"
                  name="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                />
              </div>

              <div className="text-right text-primary">
                <Link href="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (false ? " loading" : "")
                }
              >
                Login
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredGuest(Login);
