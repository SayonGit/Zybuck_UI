import { fetchCarousels } from "@/api/carouselService";
import { useQuery } from "@tanstack/react-query";

export const useCarousels = () => {
  return useQuery({
    queryKey: ["carousels"],
    queryFn: fetchCarousels,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
