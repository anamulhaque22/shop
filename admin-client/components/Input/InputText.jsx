"use client";

import { Controller } from "react-hook-form";

function InputText({
  type,
  name,
  placeholder,
  defaultValue,
  labelTitle,
  labelStyle,
  containerStyle,
  inputStyle,
}) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field, fieldState }) => (
        <div className={`form-control w-full ${containerStyle}`}>
          <label
            htmlFor="userName"
            className={`label font-causten-semi-bold text-base text-text ${labelStyle}`}
          >
            {labelTitle}
          </label>
          <input
            type={type || "text"}
            placeholder={placeholder || ""}
            className={`input text-text  input-bordered w-full focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary ${
              inputStyle || ""
            }`}
            name={name}
            {...field}
          />
          {fieldState?.error?.message && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

export default InputText;
