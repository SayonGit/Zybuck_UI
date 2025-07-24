/*  src/components/common/Footer.tsx  */
import React from "react";
import { Icon } from "@iconify/react";

const columns = [
  {
    title: "Company",
    links: ["About", "Careers", "Mobile", "Blog", "How we work"],
  },
  {
    title: "Contact",
    links: [
      "Help/FAQ",
      "Press",
      "Affiliates",
      "Hotel owners",
      "Partners",
      "Advertise with us",
    ],
  },
  {
    title: "More",
    links: [
      "Airline fees",
      "Airlines",
      "Low fare tips",
      "Badges & Certificates",
      "Security",
    ],
  },
] as const;

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 text-gray-700 border-t border-gray-200">
      {/* top area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* link columns */}
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="mb-4 font-semibold text-gray-900">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-blue-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* app badges */}
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

      {/* bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* copyright */}
          <p className="text-sm text-gray-500">© 2025 COMPANY</p>

          {/* socials */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:facebook" className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="X / Twitter"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:twitter" className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:youtube" className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Icon icon="mdi:instagram" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
