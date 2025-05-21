"use client";
import { ROLES } from "@/constants";
import useToast from "@/hooks/useToast";
import {
  usePostUserService,
  useUploadUserImageService,
} from "@/services/api/services/user";
import HTTP_CODES from "@/services/api/types/http-codes";
import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../../components/Input/InputText";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  role: yup
    .object()
    .shape({
      id: yup.number().required("Role is required"),
      name: yup.string(),
    })
    .required("Role is required"),
});

function AddUser() {
  const [imagePreview, setImagePreview] = useState(null);
  const uploadUserImage = useUploadUserImageService();
  const fetchPostUser = usePostUserService();
  const showToast = useToast();
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: {
        id: ROLES.USER,
      },
      photo: undefined,
    },
  });

  const {
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const photo = formData.photo;
    let updatedImageResponse = null;
    if (photo && photo instanceof File) {
      const { data, status } = await uploadUserImage(photo);
      if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
        showToast("Failed to upload image", "error");
      }
      if (status === HTTP_CODES.OK) {
        updatedImageResponse = data;
      }
    }

    const { data, status } = await fetchPostUser({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      photo: updatedImageResponse && {
        id: updatedImageResponse?.id,
        url: updatedImageResponse?.url,
      },
      password: formData.password,
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

    if (status === HTTP_CODES.CREATED) {
      showToast("User updated successfully", "success");
      router.push("/users");
    }
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
      setValue("photo", file);
    }
  };
  return (
    <div className="pt-8 px-6">
      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="flex justify-center mb-4">
              <label htmlFor="photo" className="cursor-pointer">
                <Image
                  src={imagePreview ?? "/images/avatar-placeholder.png"}
                  height={130}
                  width={130}
                  className="rounded-full h-[130px] w-[130px] object-fill"
                  alt="avatar"
                />
              </label>
              <Controller
                name="photo"
                render={({ field }) => (
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-3 gap-y-4">
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

              <div className="form-control w-full">
                <label
                  htmlFor="role"
                  className={`label font-causten-semi-bold text-base text-text`}
                >
                  Select User Role
                </label>
                <select className="select select-bordered w-full focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
                  <option value={ROLES.USER}>User</option>
                  <option value={ROLES.ADMIN}>Admin</option>
                </select>
              </div>

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
                className="btn bg-secondary text-text border-none"
              >
                Cancle
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(AddUser);
