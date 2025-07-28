import React from "react";
import { Icon } from "@iconify/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outlined" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: string;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  // Base styles that apply to all buttons
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-secondary-600 bg-opacity-10 text-primary-600 hover:bg-secondary-700 focus:ring-secondary-500",
    outlined:
      "border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-gray-600 bg-transparent hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const variantStylesText = {
    primary: "text-white",
    secondary: "text-primary-600",
    outlined: "text-primary-600",
    ghost: "text-gray-600",
    danger: "text-white",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    xl: "px-8 py-4 text-lg gap-3",
  };

  // Icon sizes based on button size
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  // Combine all classes
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className={`animate-spin ${iconSizes[size]}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {loading && <LoadingSpinner />}

      {!loading && icon && iconPosition === "left" && (
        <Icon icon={icon} className={iconSizes[size]} />
      )}

      <span className={variantStylesText[variant]}>{children}</span>

      {!loading && icon && iconPosition === "right" && (
        <Icon icon={icon} className={iconSizes[size]} />
      )}
    </button>
  );
};

export default Button;
