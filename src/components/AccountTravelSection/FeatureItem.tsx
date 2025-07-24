import React from "react";
import { Icon } from "@iconify/react";

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex items-center space-x-4">
    <div className="p-3">
      <Icon icon={icon} className="w-12 h-12" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default FeatureItem;
