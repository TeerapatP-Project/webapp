"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Skeleton, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

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
      <motion.div
        className="mt-6 p-5 sm:p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg w-full max-w-4xl sm:max-w-2xl transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-extrabold text-center text-gray-800 mb-5 py-3 text-xl sm:text-3xl">
          Drone Configuration
        </Typography>

        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <Skeleton
              variant="rectangular"
              height={50}
              width="100%"
              className="rounded-lg animate-pulse"
              sx={{
                background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
                backgroundSize: "200% 100%",
                animation: "loadingPulse 1.5s infinite",
              }}
            />
            <Skeleton
              variant="rectangular"
              height={50}
              width="100%"
              className="rounded-lg animate-pulse"
              sx={{
                background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
                backgroundSize: "200% 100%",
                animation: "loadingPulse 1.5s infinite",
              }}
            />
            <Skeleton
              variant="rectangular"
              height={50}
              width="100%"
              className="rounded-lg animate-pulse"
              sx={{
                background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
                backgroundSize: "200% 100%",
                animation: "loadingPulse 1.5s infinite",
              }}
            />
          </div>
        ) : droneConfig ? (
          <Paper sx={{ width: "100%", overflow: "hidden" }} className="rounded-lg shadow-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse ">
                    <thead className="bg-gray-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-sm sm:text-base font-semibold text-center rounded-tl-lg">Key</th>
                        <th className="px-4 py-3 text-sm sm:text-base font-semibold text-center rounded-tr-lg">Value</th>
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
                          <td className="px-4 py-3 text-gray-800 capitalize">{key.replace("_", " ")}</td>
                          <td className="px-4 py-3 text-gray-700">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </Paper>
        ) : (
          <p className="text-center text-gray-700 font-medium animate-pulse">
            No configuration data available.
          </p>
        )}
      </motion.div>
    </div>
  );
}
