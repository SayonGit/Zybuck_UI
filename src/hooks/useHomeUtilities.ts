// hooks/useConfig.ts
import { fetchCarousels } from "@/api/carouselService";
import {
  fetchMainMenus,
  fetchFooters,
  fetchSocialMenus,
  fetchInitConfig,
} from "@/api/configApi";
import { useQuery } from "@tanstack/react-query";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 30; // 30 minutes
const GC_TIME = 1000 * 60 * 60; // 1 hour

export const useMainMenus = () => {
  return useQuery({
    queryKey: ["mainMenus"],
    queryFn: fetchMainMenus,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => data?.main_menu || [],
  });
};

export const useInitConfig = () => {
  return useQuery({
    queryKey: ["initConfig"],
    queryFn: fetchInitConfig,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useSocialMenus = () => {
  return useQuery({
    queryKey: ["socialMenus"],
    queryFn: fetchSocialMenus,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => data?.social_menu || [],
  });
};

export const useFooters = () => {
  return useQuery({
    queryKey: ["footers"],
    queryFn: fetchFooters,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // initialData: {
    //   footer1: { heading: "", footer_menu: [] },
    //   footer2: { heading: "", footer_menu: [] },
    //   footer3: { heading: "", footer_menu: [] },
    // },
    // select: (data) => data || [],
  });
};

export const useCarousels = () => {
  return useQuery({
    queryKey: ["carousels"],
    queryFn: fetchCarousels,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useMenu = () => {
  const mainMenuQuery = useMainMenus();
  const socialMenuQuery = useSocialMenus();
  const footersQuery = useFooters();

  return {
    mainMenu: mainMenuQuery.data || [],
    socialMenu: socialMenuQuery.data || [],
    footer: footersQuery.data || {
      footer1: { heading: "", footer_menu: [] },
      footer2: { heading: "", footer_menu: [] },
      footer3: { heading: "", footer_menu: [] },
    },
    isLoading:
      mainMenuQuery.isLoading ||
      socialMenuQuery.isLoading ||
      footersQuery.isLoading,
    isError:
      mainMenuQuery.isError || socialMenuQuery.isError || footersQuery.isError,
    error: mainMenuQuery.error || socialMenuQuery.error || footersQuery.error,
    refetch: () => {
      mainMenuQuery.refetch();
      socialMenuQuery.refetch();
      footersQuery.refetch();
    },
  };
};

export const useGlobalLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return isFetching > 0 || isMutating > 0;
};
