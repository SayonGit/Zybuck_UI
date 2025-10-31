export interface SocialLinkItem {
  key: string;
  value: string | null;
}

export interface ConfigResponse {
  site_title: string;
  site_description: string;
  seo_title: string;
  seo_description: string;
  footer_copyright: string;
  contact_email: string;
  phone: string;
  address: string;
  logo: string;
  favicon: string;
  primary_color: string;
  secondary_color: string;
  primary_font: string;
  secondary_font: string;
  social_links: SocialLinkItem[][];
}

export interface FooterResponse {
  heading: string;
  footer_menu: FooterMenu[];
}

export interface FooterMenu {
  title: string;
  url: string;
  children: any[];
}

export interface MainMenuResponse {
  main_menu: MainMenu[];
}

export interface MainMenu {
  id: number;
  title: string;
  url: string;
  children: MainMenuChildren[];
}

export interface MainMenuChildren {
  id: number;
  title: string;
  url: string;
  children: any[];
}

export interface SocialMenuResponse {
  social_menu: SocialMenu[];
}

export interface SocialMenu {
  id: number;
  title: string;
  url: string;
  children: any[];
}
