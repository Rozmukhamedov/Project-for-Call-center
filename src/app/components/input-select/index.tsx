import { FC } from "react";
import Select, { StylesConfig, Props as SelectProps } from "react-select";

type OptionType = {
  value: null | number | string | boolean;
  label: string;
};

export const selectStyles: StylesConfig<any> = {
  control: (provided) => ({
    ...provided,
    padding: 0,
    border: "1px solid #ced4da",
    borderRadius: "0.375rem",
  }),
  input: (styles) => ({
    ...styles,
    padding: 0,
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
    zIndex: 999,
  }),
  valueContainer: (styles) => ({ ...styles, padding: "0.775rem 1rem" }),
};

interface ESInputSelectProps extends Omit<SelectProps, "onChange" | "value"> {
  label?: string;
  touched?: boolean;
  errors?: string;
  options?: OptionType[];
  value: OptionType["value"]; // Используем значение из OptionType
  onChange: (option: OptionType | null) => void; // Обновляем onChange  value: string | number | null;
  disabled?: boolean;
  required?: boolean;
  isSearchable?: boolean;
  className?: string;
}

export const ESInputSelect: FC<ESInputSelectProps> = ({
  label,
  touched,
  errors,
  options,
  onChange,
  value,
  disabled,
  className,
  required = false,
  isSearchable = true,
}) => {
  const isError = touched && errors;

  return (
    <>
      {label && (
        <label className="form-label d-flex align-items-end">
          {label}{" "}
          {required && (
            <span className="text-danger" style={{ marginBottom: "1px" }}>
              *
            </span>
          )}
        </label>
      )}
      <Select
        styles={selectStyles}
        placeholder=""
        components={{
          IndicatorSeparator: () => null,
        }}
        className={`react-select-styled react-select-solid ${className}`}
        classNames={{
          control: () =>
            `${
              touched && !errors
                ? "form-control p-0 border-success"
                : touched && errors
                ? "form-control p-0 border-danger"
                : "form-control p-0"
            } ${disabled ? "disabledinputs-style" : ""}`,
        }}
        options={options}
        onChange={onChange}
        value={{
          value:
            (options?.find((x: OptionType) => x.value == value) || {}).value ||
            null,
          label:
            (options?.find((x: OptionType) => x.value == value) || {}).label ||
            "",
        }}
        isDisabled={disabled}
        isSearchable={isSearchable}
      />
      {isError && (
        <div id={`${name}-error`} className="text-danger">
          {errors}
        </div>
      )}{" "}
    </>
  );
};
