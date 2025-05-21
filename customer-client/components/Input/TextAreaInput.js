import { Controller } from "react-hook-form";

function TextAreaInput({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  return (
    <Controller
      name={"orderNotes"}
      render={({ field, fieldState }) => (
        <div className={`form-control w-full ${containerStyle}`}>
          <label className="label">
            <span className={"label-text text-base-content " + labelStyle}>
              {labelTitle}
            </span>
          </label>
          <textarea
            name="orderNote"
            className="textarea textarea-bordered w-full"
            placeholder={placeholder || ""}
            {...field}
          ></textarea>
        </div>
      )}
    />
  );
}

export default TextAreaInput;
