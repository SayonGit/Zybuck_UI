import type { NavigateFunction } from "react-router-dom";

export interface SearchParams {
  [key: string]: string | number | boolean;
}

export const navigateToSearch = (
  navigate: NavigateFunction,
  searchType: "flight" | "hotel" | "car",
  params: SearchParams
) => {
  const searchParams = new URLSearchParams();

  // Add search type
  searchParams.set("type", searchType);

  // Add all parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  navigate(`/search?${searchParams.toString()}`);
};

export const getSearchTypeFromParams = (
  searchParams: URLSearchParams
): string => {
  return searchParams.get("type") || "flight";
};

export const formatSearchParams = (params: SearchParams): string => {
  return Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");
};
