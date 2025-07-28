import React from "react";
import Layout from "../components/Layout";

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: "Total Bookings",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Active Flights",
      value: "89",
      change: "+3%",
      changeType: "increase",
    },
    {
      name: "Revenue Today",
      value: "$45,678",
      change: "+8%",
      changeType: "increase",
    },
    {
      name: "Pending Bookings",
      value: "23",
      change: "-2%",
      changeType: "decrease",
    },
  ];

  const recentBookings = [
    {
      id: "BK001",
      customer: "John Doe",
      flight: "AA123",
      date: "2024-01-15",
      status: "Confirmed",
    },
    {
      id: "BK002",
      customer: "Jane Smith",
      flight: "UA456",
      date: "2024-01-15",
      status: "Pending",
    },
    {
      id: "BK003",
      customer: "Bob Johnson",
      flight: "DL789",
      date: "2024-01-14",
      status: "Confirmed",
    },
    {
      id: "BK004",
      customer: "Alice Brown",
      flight: "SW012",
      date: "2024-01-14",
      status: "Cancelled",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === "increase"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <svg
                            className={`self-center flex-shrink-0 h-5 w-5 ${
                              stat.changeType === "increase"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d={
                                stat.changeType === "increase"
                                  ? "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                  : "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                              }
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="sr-only">
                            {stat.changeType === "increase"
                              ? "Increased"
                              : "Decreased"}{" "}
                            by
                          </span>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Bookings
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Latest flight bookings in the system
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {booking.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {booking.customer}
                          </p>
                          <p className="ml-2 text-sm text-gray-500">
                            #{booking.id}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <p>Flight {booking.flight}</p>
                          <span className="mx-2">•</span>
                          <p>{booking.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <div className="flex justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <a
                  href="/bookings"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All
                </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">4</span> of{" "}
                    <span className="font-medium">1,234</span> bookings
                  </p>
                </div>
                <div>
                  <a
                    href="/bookings"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View All Bookings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
