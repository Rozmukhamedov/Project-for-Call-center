import clsx from "clsx";
import "./input-phone.css"; // Не забудьте включить этот файл стилей
import { FC } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";

interface ESInputPhoneProps extends PhoneInputProps {
  label?: string;
  touched?: boolean;
  errors?: string;
  required?: boolean;
}

export const ESInputPhone: FC<ESInputPhoneProps> = ({
  value,
  onChange,
  placeholder = "94 650-07-32", // Placeholder для узбекского номера без кода страны
  label,
  touched,
  errors,
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <PhoneInput
        country="uz" // Устанавливаем Узбекистан как страну по умолчанию
        onlyCountries={["uz"]} // Ограничиваем только Узбекистан
        disableCountryCode={false} // Оставляем код страны видимым
        disableDropdown={true} // Отключаем возможность выбора другой страны
        inputClass={clsx({
          "is-invalid": touched && errors,
          "is-valid": touched && !errors,
          "disabledinputs-style": disabled,
        })}
        containerClass="phone-input-container" // Добавляем контейнер для управления стилями
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        masks={{ uz: "(..) ...-..-.." }} // Устанавливаем маску для Узбекистана
        {...props}
      />
      {touched && errors && <div className="text-danger">{errors}</div>}
    </div>
  );
};
