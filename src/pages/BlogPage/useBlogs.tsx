import { fetchAllBlogs, fetchSlugBlogs } from "@/api/blogApiService";
import { useCallback, useEffect, useState } from "react";

export interface BlogResponse {
  posts: Posts;
}

export interface Posts {
  current_page: number;
  data: Daum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Daum {
  name: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author_name: string;
  banner_image: string;
  categories: string[];
  tags: string[];
  seo: Seo;
  created_at: string;
}

export interface Seo {
  meta_title: string;
  meta_description: string;
  is_index: string;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface UseBlogsResult {
  data: BlogResponse | null;
  loading: boolean;
  error: Error | null;
  handleLoadMore: () => void;
  singleBlog: Daum | null;
}

export default function useBlogs(blogSlug?: string): UseBlogsResult {
  const [data, setData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [singleBlog, setSingleBlog] = useState<Daum | null>(null);

  useEffect(() => {
    if (!blogSlug) {
      const fetchAllPages = async () => {
        setLoading(true);
        setError(null);

        try {
          const allData = await fetchAllBlogs();
          if (data?.posts.data) {
            allData.posts.data = [...data.posts.data, ...allData.posts.data];
          }
          setData(allData);
        } catch (err: any) {
          if (err.name !== "CanceledError" && err.name !== "AbortError")
            setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchAllPages();
    }
  }, [blogSlug]);
  useEffect(() => {
    if (blogSlug) {
      const fetchSlugPages = async () => {
        setLoading(true);
        setError(null);

        try {
          const singleData = await fetchSlugBlogs(blogSlug);
          if (singleData) {
            setSingleBlog(singleData);
          }
        } catch (err: any) {
          if (err.name !== "CanceledError" && err.name !== "AbortError")
            setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchSlugPages();
    }
  }, [blogSlug]);

  const handleLoadMore = useCallback(() => {
    if (data?.posts.next_page_url) {
      fetchAllBlogs(data?.posts.next_page_url);
    }
  }, []);

  return { data, loading, error, handleLoadMore, singleBlog };
}
