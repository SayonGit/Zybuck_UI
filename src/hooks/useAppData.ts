import { useSelector } from "react-redux";
import type { RootState } from "../store";

export const useAppData = () => {
  const appData = useSelector((state: RootState) => state.appData);

  return {
    // Form tabs
    tabs: appData.tabs,

    // Scrolling images
    scrollingImages: appData.scrollingImages,

    // Flight form options
    flightClassOptions: appData.flightClassOptions,
    airlineOptions: appData.airlineOptions,

    // Hotel form options
    citizenshipOptions: appData.citizenshipOptions,
    starRatingOptions: appData.starRatingOptions,
    earlyCheckinoutTimeOptions: appData.earlyCheckinoutTimeOptions,
    roomTypeOptions: appData.roomTypeOptions,

    // Car form options
    carOptions: appData.carOptions,

    // Service features
    serviceFeatures: appData.serviceFeatures,

    // Flight deals
    flightDeals: appData.flightDeals,

    // Trending cities
    trendingCities: appData.trendingCities,

    // Popular destinations
    popularDestinations: appData.popularDestinations,

    // Account travel features
    accountTravelFeatures: appData.accountTravelFeatures,
  };
};
