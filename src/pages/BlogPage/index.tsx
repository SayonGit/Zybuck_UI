import { Breadcrumb, type BreadcrumbItem } from "@/components/Breadcrumb";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { type FC } from "react";
import { BlogPostCard } from "./BlogPostCard";
import useBlogs from "./useBlogs";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
];

export const BlogPage: FC = () => {
  const { data, loading, handleLoadMore } = useBlogs();

  // Utility styles for title readability
  const utilityStyles = `
    .text-shadow-lg {
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    }
  `;
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
              {/* Hero Image Container */}
              <div className="relative h-64 sm:h-80 md:h-96">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: `url('${
                      data?.blogs_page.banner_image ||
                      data?.posts.data[0].banner_image
                    }')`,
                  }}
                  aria-label="Background image for blog hero section"
                >
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black opacity-45"></div>
                </div>

                {/* Content Overlay - Used for the main title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-shadow-lg tracking-tight mb-2">
                    {data?.blogs_page.title || "Blogs"}
                  </h1>
                  <p className="text-lg text-gray-200 text-shadow-lg hidden sm:block">
                    {data?.blogs_page.description ||
                      "Thoughts, stories, and news from our team."}
                  </p>
                </div>

                {/* Breadcrumb Container - positioned absolutely at the bottom */}
                <div className="absolute bottom-4 container mx-auto left-1/2 -translate-x-1/2">
                  <Breadcrumb items={breadcrumbItems} />
                </div>
              </div>
            </div>

            {/* Blog Post Grid */}
            <main className="p-6 pb-16 lg:px-0 px-2 container mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Recent Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.posts.data.map((post, index) => (
                  <BlogPostCard key={index} post={post} />
                ))}
              </div>

              {data?.posts.next_page_url && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Load More Posts
                  </button>
                </div>
              )}
            </main>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
