import React, { FC } from "react";
import { Form } from "react-bootstrap";
import "./pagination-size.css";

interface SelectProps {
  options?: { value: number; label: string }[];
  value: string | number;
  onChange: (value: number) => void;
  disabled?: boolean;

}

const ESPaginationSize: FC<SelectProps> = ({
  options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
  ],
  value,
  onChange,
  disabled = false,

}) => {
  return (
    <div className="pagination-block">
      <Form.Group>
        <Form.Select
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          disabled={disabled}
          className="pagination-selects"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export { ESPaginationSize };
