import React, { useEffect, useState } from "react";

interface ToggleProps {
  value?: boolean; // Добавлено для Formik
  onChange?: (state: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const ESToggle: React.FC<ToggleProps> = ({
  value = false,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  const [isToggled, setIsToggled] = useState(value);

  useEffect(() => {
    setIsToggled(value);
  }, [value]);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isToggled;
    setIsToggled(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="toggle-container d-flex flex-column">
      {!!label && <label className="form-label toggle-label">{label}</label>}
      <div
        className={`toggle-switch ${className} ${isToggled ? "on" : "off"} ${
          disabled ? "disabled" : ""
        }`}
        onClick={handleToggle}
        role="switch"
        aria-checked={isToggled}
        tabIndex={0}
      >
        <div className="toggle-handle" />
      </div>
    </div>
  );
};

export { ESToggle };
