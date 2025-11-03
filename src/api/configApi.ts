import type {
  ConfigResponse,
  FooterResponse,
  MainMenuResponse,
  SocialMenuResponse,
} from "@/types/config";
import axios from "axios";

export const fetchSiteConfig = async (): Promise<ConfigResponse> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/site-settings`, {
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
    },
  });
  if (res.status !== 200) throw new Error("Failed to fetch configuration");
  return res.data;
};

export const fetchMainMenus = async (): Promise<MainMenuResponse> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/main-menu`, {
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
    },
  });
  if (res.status !== 200) throw new Error("Failed to fetch menus");
  return res.data;
};

export const fetchSocialMenus = async (): Promise<SocialMenuResponse> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/social-menu`, {
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
    },
  });
  if (res.status !== 200) throw new Error("Failed to fetch menus");
  return res.data;
};

export const fetchFooters = async (): Promise<{
  footer1: FooterResponse;
  footer2: FooterResponse;
  footer3: FooterResponse;
}> => {
  const headers = { Authorization: import.meta.env.VITE_API_KEY };

  const [footer1Res, footer2Res, footer3Res] = await Promise.all([
    axios.get(`${import.meta.env.VITE_API_URL}/footer-menu-1`, { headers }),
    axios.get(`${import.meta.env.VITE_API_URL}/footer-menu-2`, { headers }),
    axios.get(`${import.meta.env.VITE_API_URL}/footer-menu-3`, { headers }),
  ]);

  if (
    footer1Res.status !== 200 ||
    footer2Res.status !== 200 ||
    footer3Res.status !== 200
  ) {
    throw new Error("Failed to fetch configuration");
  }

  return {
    footer1: footer1Res.data,
    footer2: footer2Res.data,
    footer3: footer3Res.data,
  };
};
