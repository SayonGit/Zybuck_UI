import { Breadcrumb, type BreadcrumbItem } from "@/components/Breadcrumb";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageContent } from "./usePageContent";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const DynamicPage: FC = () => {
  const { pageName } = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const { fetchContent, pageContent, error, loading } = usePageContent();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate("/not-found", { replace: true });
    }
    if (pageName) {
      fetchContent(pageName);
    }
  }, [pageName, error]);
  useEffect(() => {
    if (pageContent) {
      setBreadcrumbItems([
        { label: "Home", href: "/" },
        { label: pageContent.name, href: `/${pageContent.slug}` },
      ]);
    }
  }, [pageContent]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <div className="w-full mb-8">
        <div className="relative h-64 sm:h-80 md:h-96">
          {/* Background Image Container */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url('${pageContent?.banner_image}')` }}
            aria-label="Background image for hero section"
          >
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Content Overlay - Used for the main title */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-shadow-lg tracking-tight">
              {pageContent?.name || "Loading..."}
            </h1>
          </div>

          {/* Breadcrumb Container - positioned absolutely at the bottom 
          'bottom-4' and 'left-1/2' with '-translate-x-1/2' centers it horizontally.
        */}
          <div className="absolute bottom-4 container mx-auto left-1/2 -translate-x-1/2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Example content section below the hero */}
        <div className="p-6 pb-16 lg:px-0 px-2 container mx-auto">
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Content Area
          </h2>
          <p className="text-gray-600">
            This is the main content area of the page, continuing below the hero
            section. The breadcrumb navigation sits beautifully integrated into
            the image above.
          </p> */}
          <div
            dangerouslySetInnerHTML={{ __html: pageContent?.content || "" }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
