"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { ClipLoader } from "react-spinners";  // ใช้ RingLoader จาก react-spinners

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
    <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-10">
      <Navbar />
      <div className="mt-10 p-6 sm:p-8 bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-3xl transition-all duration-500">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-lg">
          Drone Configuration
        </h1>
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-4">
            <ClipLoader color="#FF61A6" loading={loading} size={70} />
            <span className="text-neutral-600 font-semibold text-xl animate-pulse">Just a sec... Loading</span>
          </div>
        ) : droneConfig ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-left">
                <tr>
                  <th className="px-4 py-2 text-lg font-semibold text-white text-center">Key</th>
                  <th className="px-4 py-2 text-lg font-semibold text-white text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(droneConfig).map(([key, value]) => (
                  <tr key={key} className="border-t border-gray-300 text-center">
                    <td className="px-4 py-2 text-gray-700 capitalize">{key.replace("_", " ")}</td>
                    <td className="px-4 py-2 text-gray-700">{value}</td>
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
