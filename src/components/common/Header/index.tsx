import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { useLogin } from "../../../hooks/useLogin";

const Header: React.FC = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, user, loading, error, login, logout, clearError } =
    useLogin();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const popupRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClosePopup = () => {
    setShowLoginPopup(false);
    setCredentials({ email: "", password: "" });
    clearError();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClosePopup();
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <header className="flex justify-between items-center p-6 relative w-full">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="md:text-2xl text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Company Logo
        </Link>
      </div>

      <div className="flex md:gap-4 gap-2">
        {!isLoggedIn ? (
          <button
            onClick={() => setShowLoginPopup(!showLoginPopup)}
            className="md:px-6 md:py-2 px-4 py-2 md:font-medium text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-colors"
            >
              <span className="text-primary-700">{user?.name?.[0] || "U"}</span>
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/bookings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {showLoginPopup && !isLoggedIn && (
          <div
            ref={popupRef}
            className="absolute right-0 top-20 w-full max-w-md bg-white rounded-xl shadow-2xl p-8 z-50 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    /* Add forgot password handler */
                  }}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

              {/* <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{" "}
                </span>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Sign up
                </a>
              </div> */}
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
