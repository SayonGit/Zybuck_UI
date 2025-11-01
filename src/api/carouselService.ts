import type { ImageDataDashboardResponse } from "@/types/config";
import axios from "axios";

export const fetchCarousels = async (): Promise<ImageDataDashboardResponse> => {
  const endpoints = [
    "/data/popular-destinations",
    "/data/flight-deals",
    "/data/trending-cities",
    "/data/scrolling-images",
  ];

  const requests = endpoints.map((endpoint) =>
    axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      headers: { Authorization: import.meta.env.VITE_API_KEY },
    })
  );

  const responses = await Promise.all(requests);

  // Merge all response objects into one
  const mergedData: ImageDataDashboardResponse = responses.reduce(
    (acc, res) => {
      return { ...acc, ...res.data };
    },
    {
      popular_destinations: [],
      flight_deals: [],
      trending_cities: [],
      scrolling_images: [],
    } as ImageDataDashboardResponse
  );

  return mergedData;
};
