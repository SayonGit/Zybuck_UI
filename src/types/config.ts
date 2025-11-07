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
  hero_banner: HeroBanner;
  flight_deals: FlightDeals;
  trending_cities: TrendingCities;
  popular_destinations: PopularDestinations;
  social_links: SocialLink[][];
}

export interface HeroBanner {
  heading: string;
  sub_heading: string;
  is_button: boolean;
  btn_text: any;
  btn_url: any;
}

export interface FlightDeals {
  heading: string;
  sub_heading: string;
  is_button: boolean;
  btn_text: string;
  btn_url: string;
}

export interface TrendingCities {
  heading: string;
  sub_heading: string;
  is_button: boolean;
  btn_text: string;
  btn_url: string;
}

export interface PopularDestinations {
  heading: string;
  sub_heading: string;
  is_button: boolean;
  btn_text: string;
  btn_url: string;
}

export interface SocialLink {
  key: string;
  value?: string;
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

export interface FlightDealsResponse {
  flight_deals: FlightDeal[];
}

export interface FlightDeal {
  id: number;
  from: string;
  to: string;
  price: number;
  airline: string;
  departure: string;
  return: string;
  image: string;
  type: string;
  url: string;
}

export interface TrendingCitiesResponse {
  trending_cities: TrendingCity[];
}

export interface TrendingCity {
  id: number;
  name: string;
  country: string;
  image: string;
  deals: number;
  url: string;
}

export interface PopularDestinationsResponse {
  popular_destinations: PopularDestination[];
}

export interface PopularDestination {
  id: string;
  cityName: string;
  countryName: string;
  image: string;
  isPopular?: boolean;
  category: string;
  secondCityName?: string;
  secondCountryName?: string;
  url: string;
}

export interface ScrollingImagesResponse {
  scrolling_images: ScrollingImage[];
}

export interface ScrollingImage {
  id: string;
  src: string;
  alt: string;
}

export interface ImageDataDashboardResponse {
  flight_deals: FlightDeal[];
  trending_cities: TrendingCity[];
  popular_destinations: PopularDestination[];
  scrolling_images: ScrollingImage[];
}

export interface InitDataResponse {
  settings: Settings;
  main_menu: { main_menu: MainMenu[] };
  social_menu: { social_menu: SocialMenu[] };
  footer_menu_1: { heading: string; footer_menu: FooterMenu[] };
  footer_menu_2: { heading: string; footer_menu: FooterMenu[] };
  footer_menu_3: { heading: string; footer_menu: FooterMenu[] };
}

export interface Settings {
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
  hero_banner: HeroBanner;
  home_page: HomePage;
  flight_deals: FlightDeals;
  trending_cities: TrendingCities;
  popular_destinations: PopularDestinations;
  social_links: SocialLink[][];
  isCached: boolean;
}

export interface HomePage {
  content: string;
  image: string;
  banner_image: any;
  seo: Seo;
}

export interface Seo {
  meta_title: any;
  meta_description: any;
  is_index: any;
}
