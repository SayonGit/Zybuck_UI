import React from "react";
import { Icon } from "@iconify/react";
import FeatureItem from "./FeatureItem";
import { useAppData } from "../../hooks/useAppData";

const AccountTravelSection: React.FC = () => (
  <section className="py-12 px-4 sm:px-0 lg:px-0">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
      Your account, your travel
    </h2>
    <div className="bg-white mt-2 md:mt-4 p-4 sm:p-6 lg:p-8 lg:flex lg:items-center lg:justify-between lg:space-x-8  border b-clr">
      <div className="lg:w-1/2 space-y-6">
        <p className="text-lg text-gray-600">
          All your trip details in one place
        </p>
        <p className="text-sm text-gray-500">
          Sign in to book faster and manage your trip with ease
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
            Sign in
          </button>
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition">
            Register
          </button>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 flex justify-end">
        <Icon
          icon="streamline-emojis:wrapped-gift-2"
          className="w-20 h-20 text-blue-100"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
);

export default AccountTravelSection;

export const FeatureItemContainer = () => {
  // Get account travel features from Redux store
  const { accountTravelFeatures } = useAppData();

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 bg-lighest-gray px-16 py-8">
      {accountTravelFeatures.map((feature: any) => (
        <FeatureItem
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};
