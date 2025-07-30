import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
  showFooter?: boolean;
  showHeader?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen">
      {showHeader && <Header />}
      <main className="pb-16 lg:px-0 px-2 container mx-auto">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
