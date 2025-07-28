import { useParams, Link } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">Details Page</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Item ID: {id}</h2>

          <div className="space-y-4">
            <p className="text-gray-600">
              This is a detailed view for item with ID: <strong>{id}</strong>
            </p>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium mb-2">Route Parameters:</h3>
              <p className="text-sm text-gray-700">
                Current ID from URL:{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">{id}</code>
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-medium mb-2">Navigation:</h3>
              <p className="text-sm text-gray-700">
                You can navigate to different detail pages by changing the URL:
              </p>
              <div className="mt-2 space-x-2">
                <Link
                  to="/details/1"
                  className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Details 1
                </Link>
                <Link
                  to="/details/2"
                  className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Details 2
                </Link>
                <Link
                  to="/details/3"
                  className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Details 3
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
