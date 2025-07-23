import type { HTMLInputTypeAttribute } from "react";

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  isDouble?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  disabled = false,
  required = false,
  className = "",
  isDouble = false,
}) => {
  return (
    <div
      className={`relative h-input ${
        isDouble ? "" : "border b-clr rounded-lg"
      }  px-2 py-1 ${className}`}
    >
      <label className="block text-xs text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        className="w-full p-0 border-none focus:outline-none focus:ring-0 font-semibold text-gray-800 placeholder:text-gray-400"
      />
    </div>
  );
};

export default InputField;
