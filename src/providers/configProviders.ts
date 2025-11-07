import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInitConfig } from "@/api/configApi";
import { ConfigContext } from "@/context/configContext";

export default function ConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["site-config"],
    queryFn: fetchInitConfig,
    staleTime: Infinity,
  });

  return React.createElement(
    ConfigContext.Provider,
    {
      value: {
        config: data?.settings || null,
        isLoading,
        main_menu: data?.main_menu || null,
        social_menu: data?.social_menu || null,
        footer_menu_1: data?.footer_menu_1 || null,
        footer_menu_2: data?.footer_menu_2 || null,
        footer_menu_3: data?.footer_menu_3 || null,
      },
    },
    children
  );
}
