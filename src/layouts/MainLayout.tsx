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
    <div className="dashboard-container min-h-screen">
      {showHeader && <Header />}
      <main className="pb-16">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
