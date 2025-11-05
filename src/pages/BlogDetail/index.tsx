import { Breadcrumb, type BreadcrumbItem } from "@/components/Breadcrumb";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useState, type FC, useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";
import useBlogs from "../BlogPage/useBlogs";
import { useParams } from "react-router-dom";

export const BlogDetail: FC = () => {
  const { id } = useParams();
  const { singleBlog, loading } = useBlogs(id);
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

  const utilityStyles = `
    .text-shadow-lg {
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    }
  `;

  useEffect(() => {
    if (singleBlog) {
      setBreadcrumbItems([
        { label: "Home", href: "/" },
        { label: "Blogs", href: "/blogs" },
        { label: singleBlog.name, href: "/" + id },
      ]);
    }
  }, [singleBlog, id]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{utilityStyles}</style>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header />
          <div>
            <div className="w-full mb-8">
              <div className="relative h-64 sm:h-80 md:h-96">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: `url('${singleBlog?.banner_image}')`,
                  }}
                  aria-label="Background image for blog hero section"
                >
                  <div className="absolute inset-0 bg-black opacity-45"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-shadow-lg tracking-tight mb-2">
                    Blogs
                  </h1>
                  <p className="text-lg text-gray-200 text-shadow-lg hidden sm:block">
                    Thoughts, stories, and news from our team.
                  </p>
                </div>
                <div className="absolute bottom-4 container mx-auto left-1/2 -translate-x-1/2">
                  <Breadcrumb items={breadcrumbItems} />
                </div>
              </div>
            </div>
            <main className="p-6 pb-16 lg:px-0 px-2 container mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">
                {singleBlog?.name}
              </h2>
              <p className="text-md text-gray-400 mb-8">
                {singleBlog?.author_name}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: singleBlog?.content || "" }}
              />
            </main>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
