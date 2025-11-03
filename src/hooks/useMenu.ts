import {
  fetchFooters,
  fetchMainMenus,
  fetchSocialMenus,
} from "@/api/configApi";
import type { FooterResponse, MainMenu, SocialMenu } from "@/types/config";
import { useEffect, useState } from "react";

export const useMenu = () => {
  const [mainMenu, setMainMenu] = useState<MainMenu[]>([]);
  const [socialMenu, setSocialMenu] = useState<SocialMenu[]>([]);
  const [footer, setFooter] = useState<{
    footer1: FooterResponse;
    footer2: FooterResponse;
    footer3: FooterResponse;
  }>({
    footer1: { heading: "", footer_menu: [] },
    footer2: { heading: "", footer_menu: [] },
    footer3: { heading: "", footer_menu: [] },
  });
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [mainMenuRes, footersRes, socialMenuRes] = await Promise.all([
          fetchMainMenus(),
          fetchFooters(),
          fetchSocialMenus(),
        ]);
        setMainMenu(mainMenuRes?.main_menu);
        setSocialMenu(socialMenuRes?.social_menu);
        setFooter(footersRes);
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    };
    fetchMenus();
  }, []);

  return { footer, mainMenu, socialMenu };
};
