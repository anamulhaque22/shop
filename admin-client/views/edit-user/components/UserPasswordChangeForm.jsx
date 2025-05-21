"use client";
import InputText from "@/components/Input/InputText";
import useToast from "@/hooks/useToast";
import { usePatchUserService } from "@/services/api/services/user";
import HTTP_CODES from "@/services/api/types/http-codes";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
export default function UserPasswordChangeForm() {
  const params = useParams();
  const fetchPetchUser = usePatchUserService();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const showToast = useToast();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchPetchUser({
      id: userId,
      data: {
        password: formData.password,
      },
    });

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
      reset(formData);
      showToast("User password updated successfully", "success");
    }
  });

  return (
    <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc mt-4">
      <h2 className="text-xl text-center font-causten-semi-bold text-text mb-4">
        Change password
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-3 gap-y-4">
            <InputText
              name="password"
              type="password"
              containerStyle="mt-0 "
              labelTitle="Password"
            />

            <InputText
              name="confirmPassword"
              type="password"
              containerStyle="mt-0 "
              labelTitle="Confirm Password"
            />
          </div>

          <div className="flex justify-end mt-2 gap-x-2">
            <button
              type="submit"
              className={
                "btn" + (isSubmitting ? " btn-disabled" : " btn-primary")
              }
              disabled={isSubmitting}
            >
              Save
            </button>
            <Link
              href={"/users"}
              className="btn btn-ghost text-text bg-transparent"
            >
              Cancle
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
