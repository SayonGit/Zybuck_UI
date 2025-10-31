import { useConfig } from "@/context/configContext";
import { useEffect } from "react";

function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function generateShades(baseColor: string) {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const colorMap: Record<string, string> = {};

  shades.forEach((shade) => {
    let percent = 0;

    switch (shade) {
      case 50:
        percent = 80; // very light
        break;
      case 100:
        percent = 60;
        break;
      case 200:
        percent = 40;
        break;
      case 300:
        percent = 20;
        break;
      case 400:
        percent = 10;
        break;
      case 500:
        percent = 0; // base
        break;
      case 600:
        percent = -10;
        break;
      case 700:
        percent = -20;
        break;
      case 800:
        percent = -30;
        break;
      case 900:
        percent = -40; // darkest
        break;
    }

    colorMap[`--color-primary-${shade}`] = shadeColor(baseColor, percent);
  });

  return colorMap;
}

export const useDynamicTheme = () => {
  const { config, isLoading: loading } = useConfig();

  useEffect(() => {
    if (loading || !config) return;
    const root = document.documentElement;

    if (config.primary_color) {
      const shades = generateShades(config.primary_color);
      Object.entries(shades).forEach(([key, val]) =>
        root.style.setProperty(key, val)
      );
      root.style.setProperty("--primary", config.primary_color);
    }

    if (config.secondary_color) {
      const shades = generateShades(config.secondary_color);
      Object.entries(shades).forEach(([key, val]) =>
        root.style.setProperty(key.replace("primary", "secondary"), val)
      );
      root.style.setProperty("--secondary", config.secondary_color);
    } else {
      const defaultSecondary = "#64748b";
      const shades = generateShades(defaultSecondary);
      Object.entries(shades).forEach(([key, val]) =>
        root.style.setProperty(key.replace("primary", "secondary"), val)
      );
      root.style.setProperty("--secondary", defaultSecondary);
    }

    if (config.primary_font) {
      root.style.setProperty("--font-family-sans", config.primary_font);
      document.body.style.fontFamily = config.primary_font;
    }

    if (config.site_title) {
      document.title = config.site_title;
    }

    if (config.favicon) {
      let favicon = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement | null;
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = `${config.favicon}?v=${Date.now()}`;
      favicon.type = "image/png";
    }
  }, [config, loading]);
};
