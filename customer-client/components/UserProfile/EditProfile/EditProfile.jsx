"use client";
import HTTP_CODES from "@/services/api/constants/http-codes";
import {
  useAuthPatchMeService,
  useUploadUserImageService,
} from "@/services/api/services/auth";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../../Input/InputText";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.string().optional().nullable(),
});
const EditProfile = () => {
  const { setUser } = useAuthActions();
  const { user } = useAuth();
  const fetchAuthPatchMe = useAuthPatchMeService("patchMe");
  const uploadUserImage = useUploadUserImageService("uploadUserImage");
  const [imagePreview, setImagePreview] = useState(null);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const avatar = formData.avatar;
    let updatedImageResponse = null;
    if (avatar && avatar instanceof File) {
      const { data, status } = await uploadUserImage(avatar);
      if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
        showToast("Failed to upload image", "error");
      }
      if (status === HTTP_CODES.OK) {
        updatedImageResponse = data;
      }
    }

    const { data, status } = await fetchAuthPatchMe({
      ...formData,
      photo: updatedImageResponse ?? {
        id: updatedImageResponse?.id,
        url: updatedImageResponse?.url,
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
      setUser(data);
      enqueueSnackbar("Profile has been updated successfully", {
        variant: "success",
      });
    }
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phone: user?.phone ?? "",
      photo: user?.photo ?? null,
    });
    setImagePreview(user?.photo?.url);
  }, [user, reset]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("avatar", file);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center mb-4">
          <label htmlFor="avatar" className="cursor-pointer">
            <Image
              src={imagePreview ?? "/images/avatar-placeholder.png"}
              height={130}
              width={130}
              className="rounded-full h-[130px] w-[130px] object-fill"
              alt="avatar"
            />
          </label>
          <Controller
            name="avatar"
            render={({ field }) => (
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageUpload}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            type="text"
            name="firstName"
            containerStyle="mt-0"
            labelTitle="First Name*"
          />
          <InputText
            type="text"
            name="lastName"
            containerStyle="mt-0"
            labelTitle="Last Name*"
          />
          <div className="form-control w-full">
            <label className="label">
              <span
                className={"font-causten-semi-bold text-base text-[#3C4242] "}
              >
                Email <span className="text-red-600">(Not Changeable)</span>
              </span>
            </label>
            <input
              type="text"
              value={user?.email}
              placeholder="Email"
              className="input  input-bordered w-full focus:outline-none"
              disabled
            />
          </div>
          <InputText
            type="text"
            name="phone"
            containerStyle="mt-0"
            labelTitle="Phone"
          />
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="btn btn-primary disabled:bg-slate-600 disabled:border-slate-600"
            disabled={isSubmitting}
          >
            Update
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProfile;
