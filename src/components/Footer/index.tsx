import React from "react";
import { Icon } from "@iconify/react";
import { useConfig } from "@/context/configContext";
import { Link } from "react-router-dom";
// import { useMenu } from "@/hooks/useHomeUtilities";

const Footer: React.FC = () => {
  // const { footer, socialMenu } = useMenu();
  const {
    config,
    social_menu: socialMenu,
    footer_menu_1,
    footer_menu_2,
    footer_menu_3,
  } = useConfig();
  const footerColumns = [footer_menu_1, footer_menu_2, footer_menu_3].filter(
    Boolean
  );

  return (
    <footer className="bg-neutral-50 text-gray-700 border-t border-gray-200">
      {/* Top Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Dynamic Footer Columns */}
          {footerColumns.map((col, i) => (
            <div key={i}>
              <h4 className="mb-4 font-semibold text-gray-900">
                {col?.heading}
              </h4>
              <ul className="space-y-2">
                {col?.footer_menu?.map((link: any, index) => (
                  <li key={index}>
                    <Link
                      to={link.url || "/"}
                      className="text-sm hover:text-primary-600 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/"}
                  className="text-sm text-primary-600 transition-colors"
                >
                  <Icon icon="mdi:location" className="inline w-4 h-4 mr-2" />
                  {config?.address || "<Address>"}
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${config?.phone || "<Phone Number>"}`}
                  className="text-sm text-primary-600 transition-colors"
                >
                  <Icon icon="mdi:call" className="inline w-4 h-4 mr-2" />
                  {config?.phone || "<Phone Number>"}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config?.contact_email || "<Email>"}`}
                  className="text-sm text-primary-600 transition-colors"
                >
                  <Icon icon="mdi:email" className="inline w-4 h-4 mr-2" />
                  {config?.contact_email || "<Email>"}
                </a>
              </li>
            </ul>
          </div>

          {/* App Store / Play Store Section */}
          {/* <div>
            <h4 className="mb-4 font-semibold text-gray-900">Get this app</h4>
            <div className="space-y-5">
              <a href="#" aria-label="Download on Google Play">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 w-[135px]"
                  loading="lazy"
                />
              </a>
              <a href="#" aria-label="Download on the App Store">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10 w-[135px] object-cover mt-2"
                  loading="lazy"
                />
              </a>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">{config?.footer_copyright}</p>

          <div className="flex items-center gap-5">
            {socialMenu?.social_menu?.map((item, index) => (
              <a
                href={item.url}
                aria-label={item.title}
                className="text-gray-500 hover:text-primary-600 transition-colors"
                key={index}
              >
                <Icon
                  icon={`mdi:${item.title?.toLowerCase()}`}
                  className="w-5 h-5"
                />
              </a>
            ))}
            {/* <a
              href="#"
              aria-label="Twitter"
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Icon icon="mdi:twitter" className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Icon icon="mdi:youtube" className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Icon icon="mdi:instagram" className="w-5 h-5" />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
