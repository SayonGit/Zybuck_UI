import React from "react";
import { X, Home, Search, Plane, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
}: SidebarProps) => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, href: "/" },
    { name: "Search Flights", icon: <Search size={18} />, href: "/search" },
    { name: "Bookings", icon: <Plane size={18} />, href: "/bookings" },
    { name: "Settings", icon: <Settings size={18} />, href: "/settings" },
  ];

  return (
    <div className="relative">
      {/* Hamburger button */}

      {/* Sidebar overlay for mobile */}
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

      {/* Sidebar content */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">Logo</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto mt-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t p-4 text-sm text-gray-500">
              © 2025 FlySmart
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      {/* <div className="hidden md:flex md:flex-col md:w-64 md:h-screen md:fixed md:left-0 md:top-0 md:bg-white md:shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">FlySmart</h2>
        </div>

        <nav className="flex-1 overflow-y-auto mt-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4 text-sm text-gray-500">
          © 2025 FlySmart
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
