import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownFieldProps {
  label: string;
  value: string;
  options: DropdownOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  isDouble?: boolean;
  searchable?: boolean;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  disabled = false,
  required = false,
  className = "",
  isDouble = false,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get display label for selected value
  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : "";

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative h-input ${
        isDouble ? "" : "border b-clr rounded-lg"
      } px-2 py-1 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {/* Label */}
      <label className="block text-xs text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Dropdown Trigger */}
      <div
        className="w-full h-6 flex items-center justify-between cursor-pointer"
        onClick={handleToggle}
      >
        <span
          className={`font-semibold ${
            displayValue
              ? "text-gray-800"
              : "text-gray-400 placeholder:text-gray-400"
          }`}
        >
          {displayValue || placeholder}
        </span>
        <Icon
          icon="heroicons:chevron-down"
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border b-clr rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-gray-100">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search options..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    option.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${
                    option.value === value
                      ? "bg-primary-50 text-primary-700"
                      : ""
                  }`}
                  onClick={() =>
                    !option.disabled && handleOptionSelect(option.value)
                  }
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.value === value && (
                      <Icon
                        icon="heroicons:check"
                        className="w-4 h-4 text-primary-600"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                {searchable && searchTerm
                  ? "No options found"
                  : "No options available"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownField;
