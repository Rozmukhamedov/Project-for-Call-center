import React, {
  TextareaHTMLAttributes,
  ChangeEventHandler,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  // value: string;
  onChange: (value: string) => void;
  label?: string;
  errors?: string;
  className?: string;
  touched?: boolean;
  required?: boolean;
  maxLength?: number;
}

const ESTextarea: React.FC<TextareaProps> = ({
  value,
  maxLength = 255,
  onChange,
  label,
  errors,
  touched,
  className,
  required = false,
  ...props
}) => {
  const isError = touched && !!errors;
  const isValid = touched && !errors;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Функция для автоматического увеличения высоты
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Сброс высоты
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Установка высоты
    }
  };

  // Внутренний обработчик изменений
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange(event.target.value); // Передаем изменение наружу
    adjustHeight(); // Регулируем высоту
  };

  // Следим за изменением value из пропсов
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        ref={textareaRef} // Привязываем ref
        maxLength={maxLength}
        value={value} // Используем значение из пропсов
        onChange={handleChange} // Обработчик изменений
        className={clsx("form-control no-resize", className, {
          "is-invalid sd-is-invalid": isError,
          "is-valid sd-is-valid": isValid,
          "disabledinputs-style": props.disabled,
        })}
        style={{ overflow: "hidden" }} // Скрываем прокрутку
        {...props}
      />
      {isError && <div className="text-danger">{errors}</div>}
    </>
  );
};

export { ESTextarea };
