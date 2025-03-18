"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { ClipLoader } from "react-spinners";

export default function ConfigPage() {
  const [droneConfig, setDroneConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDroneConfig = async () => {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      try {
        const response = await axios.get(`/api/configs/${droneId}`);
        setDroneConfig(response.data);
      } catch (error) {
        console.error("Error fetching drone config:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDroneConfig();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-gray-200 to-rose-100 min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-10">
      <Navbar />
      <div className="mt-6 p-5 sm:p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl transition-all duration-500">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-5">
          Drone Configuration
        </h1>
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <ClipLoader color="#6B46C1" loading={loading} size={50} />
            <span className="text-gray-700 font-medium text-lg animate-pulse">
              Loading...
            </span>
          </div>
        ) : droneConfig ? (
          <div className="overflow-hidden bg-white rounded-xl shadow-lg">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-m font-semibold text-center rounded-tl-xl">Key</th>
                  <th className="px-4 py-3 text-m font-semibold text-center rounded-tr-xl">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(droneConfig).map(([key, value], index) => (
                  <tr
                    key={key}
                    className={`border-t border-gray-300 text-center ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-800 capitalize rounded-md">{key.replace("_", " ")}</td>
                    <td className="px-4 py-3 text-gray-700 rounded-md">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-700 font-medium animate-pulse">
            No configuration data available.
          </p>
        )}
      </div>
    </div>
  );
}