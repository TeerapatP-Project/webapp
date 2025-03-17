"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; 

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID; 
      try {
        const response = await axios.get(`/api/logs/${droneId}`); 
        setLogs(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLoading(false); 
      }
    };
    fetchLogs();
  }, []); 

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="mt-10 p-6 sm:p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-4xl transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-lg">
          Drone Logs
        </h1>
        {loading ? (
          <div className="text-center text-gray-900 font-semibold animate-pulse">
            Loading logs...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4">Created</th>
                  <th className="py-2 px-4">Country</th>
                  <th className="py-2 px-4">Drone ID</th>
                  <th className="py-2 px-4">Drone Name</th>
                  <th className="py-2 px-4">Celsius</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.created} className="border-t text-black">
                    <td className="py-2 px-4 text-center">{log.created}</td>
                    <td className="py-2 px-4 text-center">{log.country}</td>
                    <td className="py-2 px-4 text-center">{log.drone_id}</td>
                    <td className="py-2 px-4 text-center">{log.drone_name}</td>
                    <td className="py-2 px-4 text-center">{log.celsius}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
