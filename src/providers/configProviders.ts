import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfig } from "@/api/configApi";
import { ConfigContext } from "@/context/configContext";

export default function ConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["site-config"],
    queryFn: fetchSiteConfig,
    staleTime: Infinity,
  });

  return React.createElement(
    ConfigContext.Provider,
    { value: { config: data || null, isLoading } },
    children
  );
}
