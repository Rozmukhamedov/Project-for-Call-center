import clsx from "clsx";
import { ReactNode, FC, InputHTMLAttributes } from "react";

interface ESInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  touched?: boolean;
  errors?: string;
  required?: boolean;
  labelChild?: ReactNode;
}

export const ESInput: FC<ESInputProps> = ({
  name = "input",
  type = "text",
  value,
  label,
  onChange,
  touched,
  errors,
  required = false,
  labelChild,
  className,
  minLength,
  maxLength,
  max,
  min,
  disabled,
  ...props
}) => {
  const isError = touched && errors;
  const isValid = touched && !errors;

  return (
    <>
      <div className="d-flex align-items-center">
        {label && (
          <label className="form-label">
            {label}
            {required && (
              <span className="text-danger" style={{ marginBottom: "1px" }}>
                *
              </span>
            )}
          </label>
        )}
        {labelChild && <>{labelChild}</>}
      </div>
      <input
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        max={max}
        min={min}
        className={clsx("form-control", className, {
          "is-invalid sd-is-invalid": isError,
          "is-valid sd-is-valid": isValid,
          "disabledinputs-style": disabled,
        })}
        disabled={disabled}
        {...props}
      />
      {isError && (
        <div id={`${name}-error`} className="text-danger">
          {errors}
        </div>
      )}{" "}
      {/* Сообщение об ошибке */}
    </>
  );
};
