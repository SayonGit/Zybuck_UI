import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigateToForm } from "../../../utils/navigationUtils";
import "./index.scss";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleQuickNav = (formType: "flights" | "stay" | "car") => {
    navigateToForm(navigate, formType, false);
  };

  return (
    <header className="flex justify-between items-center p-6">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="md:text-2xl text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Company Logo
        </Link>

        {/* <nav className="hidden md:flex gap-6">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/") || isActive("/dashboard")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Home
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => handleQuickNav("flights")}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Flights
            </button>
            <button
              onClick={() => handleQuickNav("stay")}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Hotels
            </button>
            <button
              onClick={() => handleQuickNav("car")}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Cars
            </button>
          </div>

          <Link
            to="/about"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/about")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/contact")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Contact
          </Link>
        </nav> */}
      </div>

      <div className="flex md:gap-4 gap-2">
        <button className="md:px-6 md:py-2 px-4 py-2 md:font-medium text-sm text-gray-600 hover:text-gray-800 transition-colors">
          Login
        </button>
        <button className="md:px-6 md:py-2 px-4 py-2 md:font-medium text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
