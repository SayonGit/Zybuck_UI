import type { BlogResponse } from "@/pages/BlogPage/useBlogs";
import axios from "axios";

export const fetchAllBlogs = async (
  nextPageUrl?: string
): Promise<BlogResponse> => {
  const res = await axios.get<BlogResponse>(
    nextPageUrl || `${import.meta.env.VITE_API_URL}/posts`,
    {
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
    }
  );

  return res.data;
};
