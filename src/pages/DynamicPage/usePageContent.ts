import axios from "axios";
import { useState } from "react";

export interface PageContentResponse {
  name: string;
  description: string;
  content: string;
  image: string;
  slug: string;
  banner_image: string;
  seo: Seo;
}

export interface Seo {
  meta_title: string;
  meta_description: string;
  is_index: string;
}

export const fetchPageContent = async (
  slug: string
): Promise<PageContentResponse> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/${slug}`, {
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
    },
  });
  if (res.status !== 200) throw new Error("Failed to fetch page");
  return res.data;
};
export const usePageContent = () => {
  const [pageContent, setPageContent] = useState<PageContentResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPageContent(slug);
      setPageContent(data);
    } catch (err) {
      setError("Failed to fetch page content");
    } finally {
      setLoading(false);
    }
  };

  return { pageContent, loading, error, fetchContent };
};
