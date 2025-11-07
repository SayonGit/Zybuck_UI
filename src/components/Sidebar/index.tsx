import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfig } from "@/context/configContext";
// import { useMenu } from "@/hooks/useHomeUtilities";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { config, main_menu: mainMenu } = useConfig();
  // const { mainMenu } = useMenu();
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative">
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <img
                src={config?.logo}
                alt={config?.site_title}
                className="h-8 object-contain"
              />
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto mt-2">
              <ul className="space-y-1">
                {mainMenu?.main_menu?.map((item, index) => (
                  <li key={index}>
                    <div
                      onClick={() =>
                        item.children?.length
                          ? toggleExpand(item.id)
                          : setIsOpen(false)
                      }
                      className={`flex items-center justify-between px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors cursor-pointer ${
                        expanded === item.id ? "bg-gray-50" : ""
                      }`}
                    >
                      <a
                        href={item.url}
                        className="flex-1"
                        target="_self"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>

                      {item.children?.length > 0 && (
                        <motion.div
                          initial={false}
                          animate={{ rotate: expanded === item.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {expanded === item.id ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Submenu */}
                    <AnimatePresence>
                      {expanded === item.id && item.children?.length > 0 && (
                        <motion.ul
                          className="ml-6 mt-1 space-y-1 border-l border-gray-200"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {item.children.map((child, index) => (
                            <li key={index}>
                              <a
                                href={child.url}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors rounded"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.title}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="border-t p-4 text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} {config?.site_title || "FlySmart"}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
