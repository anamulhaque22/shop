"use client";
import { FormProvider, useForm } from "react-hook-form";

import PasswordInput from "@/components/Auth/PasswordInput";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthPatchMeService } from "@/services/api/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is required"),
  password: yup.string().required("New Password is required"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "New password and comfirm new password do not match"
    )
    .required("Confirm Password is required"),
});
const UpdatePassword = () => {
  const fetchAuthPatchMe = useAuthPatchMeService();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      oldPassword: "",
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
    const { data, status } = await fetchAuthPatchMe(formData);

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
      reset();
      enqueueSnackbar("Password has been updated successfully", {
        variant: "success",
      });
    }
  });
  return (
    <div>
      <h3 className="font-causten-bold text-2xl text-[#3C4242] mb-3">
        Account Information
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput labelText={"Old Password*"} name="oldPassword" />

            <PasswordInput labelText={"New Password*"} name="password" />

            <PasswordInput
              labelText={"Confirm Password*"}
              name="confirmPassword"
            />

            {/* <InputText
              type="password"
              name="password"
              containerStyle="mt-0"
              labelTitle="New Password*"
            />
            <InputText
              type="password"
              name="confirmPassword"
              containerStyle="mt-0"
              labelTitle="Confirm Password*"
            /> */}
          </div>
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="btn btn-primary disabled:bg-slate-600 disabled:border-slate-600"
              disabled={isSubmitting}
            >
              Change
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdatePassword;
