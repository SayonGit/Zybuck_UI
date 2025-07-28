import React from "react";
import type { ServiceFeature } from "../../../types";
import AirlineLogosStack from "./AirlineLogosStack";
import UserAvatarStack from "./RandomUserStack";
import StarRating from "./RatingStack";
import { useAppData } from "../../../hooks/useAppData";

const ServiceFeatures: React.FC = () => {
  // Get service features from Redux store
  const { serviceFeatures } = useAppData();

  // Map service features to components
  const features: ServiceFeature[] = [
    {
      element: AirlineLogosStack,
      title: "Save when you compare",
      description: "More deals, More sites, One solution",
    },
    {
      element: UserAvatarStack,
      title: "43,000,000+",
      description: "Searches this week",
    },
    {
      element: StarRating,
      title: "Travelers love our service",
      description: "1M+ rating all across the world",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {features.map((feature, index) => {
        const ElementComponent = feature.element; // Get the component
        return (
          <div
            key={index}
            className="text-left px-8 py-6 bg-white shadow-card rounded-2xl"
          >
            <div className="flex justify-left mb-4">
              <ElementComponent /> {/* Render as JSX component */}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceFeatures;
