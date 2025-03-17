"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

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
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="mt-10 p-6 sm:p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-2xl transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-lg">
          Drone Configuration
        </h1>
        {loading ? (
          <div className="text-center text-gray-900 font-semibold animate-pulse">
            Loading drone configuration...
          </div>
        ) : droneConfig ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2 text-lg font-semibold text-gray-900 text-center">Key</th>
                  <th className="px-4 py-2 text-lg font-semibold text-gray-900 text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(droneConfig).map(([key, value]) => (
                  <tr key={key} className="border-t border-gray-300">
                    <td className="px-4 py-2 text-gray-700 capitalize text-center">{key.replace("_", " ")}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-white font-semibold animate-pulse">
            No configuration data available.
          </p>
        )}
      </div>
    </div>
  );
}
