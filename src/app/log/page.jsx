"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function LogPage() {
  const [temperature, setTemperature] = useState("");
  const [droneConfig, setDroneConfig] = useState(null);

  useEffect(() => {
    const fetchDroneConfig = async () => {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      try {
        const response = await axios.get(`/api/configs/${droneId}`);
        setDroneConfig(response.data);
      } catch (error) {
        console.error("Error fetching drone config:", error);
      }
    };
    fetchDroneConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const droneId = parseInt(process.env.NEXT_PUBLIC_DRONE_ID);
    const droneName = process.env.NEXT_PUBLIC_DRONE_NAME;
    const country = process.env.NEXT_PUBLIC_COUNTRY;

    try {
      await axios.post(`/api/logs`, {
        drone_id: droneId,
        drone_name: droneName,
        celsius: temperature,
        country: country,
      });
      alert("Temperature logged successfully!");
      setTemperature("");
    } catch (error) {
      console.error("Error submitting log:", error);
      alert("Failed to log temperature");
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-15">
      <Navbar />
      <div className="mt-10 p-6 sm:p-8 bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-2xl transition-all duration-500">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-lg">
          Log Temperature
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xl text-black font-medium">Temperature (°C):</label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg text-xl hover:bg-green-700 transition"
          >
            Submit Data
          </button>
        </form>
      </div>
    </div>
  );
}
