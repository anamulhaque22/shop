"use client";
import Image from "next/image";

import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthSignUpService } from "@/services/api/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../Input/InputText";
import LoginWithSocial from "./LoginWithSocial";
import PasswordInput from "./PasswordInput";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  policy: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default function Register() {
  const router = useRouter();
  const fetchAuthSignUp = useAuthSignUpService();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      policy: false,
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    const { data, status } = await fetchAuthSignUp(formData);

    if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
      Object.keys(data.errors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: data.errors[key],
        });
      });
      return;
    }

    if (status === HTTP_CODES.NO_CONTENT) router.push("/login");
  };

  return (
    <div className="relative">
      <div className="container">
        <div className="flex justify-center md:justify-start md:flex-row-reverse">
          <div className="absolute w-2/5 left-0 top-0 hidden md:block">
            <Image
              src={"/images/sign-up-bg.png"}
              width={599}
              height={500}
              alt="sign up"
              className="w-full h-[calc(100vh_-_95px)] object-fill"
            />
          </div>
          <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
            <h3 className="font-core-sans-bold font-bold text-2xl md:text-3xl mb-6 md:mb-8">
              Sign Up
            </h3>
            <LoginWithSocial />

            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-y-1 md:gap-y-2 mt-7"
                onSubmit={handleSubmit(onSubmit)}
              >
                <InputText
                  name="firstName"
                  type="text"
                  containerStyle="mt-0"
                  labelTitle="First name"
                />

                <InputText
                  name="lastName"
                  type="text"
                  containerStyle="mt-0 "
                  labelTitle="Last name"
                />

                <InputText
                  name="email"
                  type="email"
                  containerStyle="mt-0 "
                  labelTitle="Email"
                />

                {/* <InputText
                  type="email"
                  containerStyle="mt-0 "
                  labelTitle="Email address"
                  name="email"
                /> */}

                <PasswordInput />

                <div className="flex gap-y-2 flex-col my-2">
                  <Controller
                    name="policy"
                    defaultValue={false}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="flex gap-x-2 items-start sm:items-center">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-md rounded-md border-secondary checked:border-secondary [--chkbg:theme(colors.secondary)] [--chkfg:white]"
                            error={fieldState.error?.message}
                            {...field}
                          />
                          <p className="font-causten-medium font-medium text-lg text-secondary-light">
                            Agree to our Terms of use and Privacy Policy
                          </p>
                        </div>
                        {fieldState.error && (
                          <p className="text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  {/* <input name="policy" /> */}

                  {/* <div className="flex gap-x-2 items-start sm:items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-md rounded-md border-secondary checked:border-secondary [--chkbg:theme(colors.secondary)] [--chkfg:white]"
                  />
                  <p className="font-causten-medium font-medium text-lg text-secondary-light">
                    Subscribe to our monthly newsletter
                  </p>
                </div> */}
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white disabled:bg-slate-600 disabled:border-slate-600"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </FormProvider>
            <p className="text-base font-causten-regular mt-3">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
