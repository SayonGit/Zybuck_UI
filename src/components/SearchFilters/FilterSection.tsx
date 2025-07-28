// components/SearchFilters/FilterSection.tsx
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const FilterSection = ({
  title,
  isExpanded,
  onToggle,
  children,
}: FilterSectionProps) => {
  return (
    <div className="p-3 sm:p-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-medium text-gray-900 text-sm sm:text-base">
          {title}
        </span>
        {isExpanded ? (
          <Icon
            icon="heroicons:chevron-up"
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
          />
        ) : (
          <Icon
            icon="heroicons:chevron-down"
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
          />
        )}
      </button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  );
};
