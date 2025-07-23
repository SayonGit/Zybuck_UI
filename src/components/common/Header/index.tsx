import React from "react";
import "./index.scss";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white">
      <div className="md:text-2xl text-xl font-bold text-gray-800">
        Company Logo
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
