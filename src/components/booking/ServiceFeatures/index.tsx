import React from "react";
import type { ServiceFeature } from "../../../types";

const ServiceFeatures: React.FC = () => {
  const features: ServiceFeature[] = [
    {
      icon: "💰",
      title: "Save when you compare",
      description: "More deals, More sites, One solution",
    },
    {
      icon: "👥",
      title: "43,000,000+",
      description: "Searches this week",
    },
    {
      icon: "⭐",
      title: "Travelers loves our service",
      description: "1M+ rating all across the world",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-6">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceFeatures;
