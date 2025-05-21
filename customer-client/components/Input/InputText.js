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
}) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field, fieldState }) => (
        <div className={`form-control w-full ${containerStyle}`}>
          <label
            htmlFor="userName"
            className={`label font-causten-semi-bold text-base text-[#3C4242] ${labelStyle}`}
          >
            {labelTitle}
          </label>
          <input
            type={type || "text"}
            placeholder={placeholder || ""}
            className="input  input-bordered w-full focus:outline-none"
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
