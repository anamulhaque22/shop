"use client";
import InputText from "@/components/Input/InputText";
import { ROLES } from "@/constants";
import useToast from "@/hooks/useToast";
import {
  useGetUserService,
  usePatchUserService,
  useUploadUserImageService,
} from "@/services/api/services/user";
import HTTP_CODES from "@/services/api/types/http-codes";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  role: yup
    .object()
    .shape({
      id: yup.number().required("Role is required"),
      name: yup.string(),
    })
    .required("Role is required"),
});
export default function EditUserForm() {
  const params = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  // const [product, setProduct] = useState(null);
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const fetchUser = useGetUserService();
  const fetchPetchUser = usePatchUserService();
  const uploadUserImage = useUploadUserImageService();
  const showToast = useToast();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: null,
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
    const isEmailDirty = methods.getFieldState("email").isDirty;

    const { data, status } = await fetchPetchUser({
      id: userId,
      data: {
        email: isEmailDirty ? formData.email : undefined,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        photo: {
          id: updatedImageResponse?.id,
          url: updatedImageResponse?.url,
        },
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
      showToast("User updated successfully", "success");
    }
  });

  useEffect(() => {
    const getInitialDataForEdit = async () => {
      const { data, status } = await fetchUser(userId);

      if (status === HTTP_CODES.OK) {
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: {
            id: data.role.id,
            // name: data.role.name,
          },
          photo: data.photo ?? null,
        });
        setImagePreview(data?.photo?.url ?? null);
      }
    };
    getInitialDataForEdit();
  }, [userId, fetchUser]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);

      // Manually set the file input value in React Hook Form
      setValue("avatar", file);
    }
  };
  return (
    <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
      <h2 className="text-xl text-center font-causten-semi-bold text-text mb-4">
        Edit User
      </h2>
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

            <Controller
              name="role"
              render={({ field, fieldState }) => (
                <>
                  <div className="form-control w-full">
                    <label
                      htmlFor="role"
                      className="label font-causten-semi-bold text-base text-text"
                    >
                      Select User Role
                    </label>
                    <select
                      className="text-text select select-bordered w-full focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary"
                      value={JSON.stringify(field.value)}
                      onChange={(e) =>
                        field.onChange(JSON.parse(e.target.value))
                      }
                    >
                      {Object.entries(ROLES).map(([key, value]) => (
                        <option
                          key={key}
                          value={JSON.stringify({
                            id: value,
                            // name: key,
                          })}
                        >
                          {key}
                        </option>
                      ))}
                      {/* {roles.map((role) => (
                        <option key={role.id} value={JSON.stringify(role)}>
                          {role.name}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  {fieldState?.error?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
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
