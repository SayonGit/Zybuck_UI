import { createContext, useContext } from "react";
import type {
  ConfigResponse,
  FooterMenu,
  MainMenu,
  SocialMenu,
} from "@/types/config";

interface ConfigContextValue {
  config: ConfigResponse | null;
  isLoading: boolean;
  main_menu: { main_menu: MainMenu[] } | null;
  social_menu: { social_menu: SocialMenu[] } | null;
  footer_menu_1: { heading: string; footer_menu: FooterMenu[] } | null;
  footer_menu_2: { heading: string; footer_menu: FooterMenu[] } | null;
  footer_menu_3: { heading: string; footer_menu: FooterMenu[] } | null;
}

export const ConfigContext = createContext<ConfigContextValue>({
  config: null,
  isLoading: true,
  main_menu: { main_menu: [] },
  social_menu: { social_menu: [] },
  footer_menu_1: { heading: "", footer_menu: [] },
  footer_menu_2: { heading: "", footer_menu: [] },
  footer_menu_3: { heading: "", footer_menu: [] },
});

export const useConfig = () => useContext(ConfigContext);
