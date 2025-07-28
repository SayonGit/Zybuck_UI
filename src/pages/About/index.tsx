import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">About Our Booking Platform</h1>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We provide a comprehensive booking platform that makes travel
              planning simple, efficient, and enjoyable. Our platform offers
              flights, hotels, and car rentals all in one place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Flight booking with multiple airlines</li>
              <li>Hotel reservations worldwide</li>
              <li>Car rental services</li>
              <li>Real-time pricing and availability</li>
              <li>Secure payment processing</li>
              <li>24/7 customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-600">
              For any questions or support, please contact us at:
              <a
                href="mailto:support@bookingplatform.com"
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                support@bookingplatform.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
