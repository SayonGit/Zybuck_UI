import { useState } from "react";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API call
      //   const response = await fetch("/api/login", {
      //     method: "POST",
      //     body: JSON.stringify(credentials),
      //   });
      //   const data = await response.json();

      //   if (response.ok) {
      // setUser(data.user);
      setUser({ name: "User Name", email: credentials.email });
      setIsLoggedIn(true);
      //   } else {
      //     setError(data.message);
      //   }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const clearError = () => {
    setError(null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, loading, error, login, logout, clearError };
};
