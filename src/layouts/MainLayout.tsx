import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/Footer";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";
import { ToastContainer } from "react-toastify";

interface MainLayoutProps {
  showFooter?: boolean;
  showHeader?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  showHeader = true,
  showFooter = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <ToastContainer position="bottom-right" autoClose={3000} />
      {showHeader && (
        <div className="flex">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="pl-4 text-gray-700 rounded-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <Header />
        </div>
      )}
      <main className="pb-16 lg:px-0 px-2 container mx-auto">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
