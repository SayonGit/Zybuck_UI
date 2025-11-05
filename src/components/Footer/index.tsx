import React from "react";
import { Icon } from "@iconify/react";
import { useConfig } from "@/context/configContext";
import { useMenu } from "@/hooks/useHomeUtilities";

const Footer: React.FC = () => {
  const { footer, socialMenu } = useMenu();
  const { config } = useConfig();
  console.log("Footer config:", footer, socialMenu, config);
  const footerColumns = [footer.footer1, footer.footer2, footer.footer3].filter(
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
                    <a
                      href={link.url || "#"}
                      className="text-sm hover:text-primary-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Store / Play Store Section */}
          <div>
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">{config?.footer_copyright}</p>

          <div className="flex items-center gap-5">
            {socialMenu.map((item, index) => (
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
