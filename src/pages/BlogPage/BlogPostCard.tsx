import type { FC } from "react";
import type { Daum } from "./useBlogs";
import { formatDate } from "@/services/globalServices";
import { Link } from "react-router-dom";

export const BlogPostCard: FC<{ post: Daum }> = ({ post }) => (
  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
    {/* Image */}
    <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
      <img
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        src={post.image}
        alt={`Cover image for ${post.name}`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/400x250/ccc/333?text=Post+Image";
        }}
      />
    </div>

    <div className="p-6 flex flex-col justify-between flex-grow">
      {/* Category and Date */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          {post.categories.join(", ")}
        </span>
        <time className="text-gray-500">
          {formatDate(new Date(post.created_at))}
        </time>
      </div>

      {/* Title and Excerpt */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug hover:text-blue-700 transition-colors cursor-pointer">
          {post.name}
        </h3>
        {/* <p className="text-gray-600 text-sm">{post.excerpt}</p> */}
      </div>

      {/* Read More Link */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          to={`/blogs/${post.slug}`}
          // onClick={(e) => e.preventDefault()}
          className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors flex items-center"
        >
          Read More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  </article>
);
