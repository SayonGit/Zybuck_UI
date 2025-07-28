import { Link } from "react-router-dom";

const NotFound = () => {
  console.log("NotFound component rendered");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
        </div>

        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
          <br />
          <small className="text-gray-500">
            Current URL: {window.location.pathname}
          </small>
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/about"
            className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
