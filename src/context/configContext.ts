import { createContext, useContext } from "react";
import type { ConfigResponse } from "@/types/config";

interface ConfigContextValue {
  config: ConfigResponse | null;
  isLoading: boolean;
}

export const ConfigContext = createContext<ConfigContextValue>({
  config: null,
  isLoading: true,
});

export const useConfig = () => useContext(ConfigContext);
