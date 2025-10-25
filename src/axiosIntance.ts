import axios, { type AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://test.api.amadeus.com";

let isAuthChecked = false;
let isRefreshing = false;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Function to get or refresh auth token
const checkAuth = async () => {
  if (isAuthChecked) return;
  if (isRefreshing) return new Promise((resolve) => setTimeout(resolve, 200)); // Prevent duplicate calls

  try {
    isRefreshing = true;
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", "bpX9itQ80Z9lUOZvN5A1oO3Dt1cnX7dF");
    params.append("client_secret", "QAUmDPSJF2OUxgbV");

    const response = await axios.post(
      `${API_BASE_URL}/v1/security/oauth2/token`,
      params,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = response.data?.access_token;
    if (token) localStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Auth check failed:", error);
  } finally {
    isAuthChecked = true;
    isRefreshing = false;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    await checkAuth();

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// // Response interceptor (optional)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("accessToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
