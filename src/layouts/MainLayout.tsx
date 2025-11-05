import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { useGlobalLoading } from "@/hooks/useHomeUtilities";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface MainLayoutProps {
  showFooter?: boolean;
  showHeader?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  showHeader = true,
  showFooter = true,
}) => {
  const isLoading = useGlobalLoading();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <ToastContainer position="bottom-right" autoClose={3000} />
      {showHeader && (
        <div className="flex">
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
