"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ClipLoader } from "react-spinners";
import {
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  useEffect(() => {
    const fetchLogs = async () => {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      try {
        const response = await axios.get(`/api/logs/${droneId}`);
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDropdownChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const pageCount = Math.ceil(logs.length / logsPerPage);

  const pageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );

  return (
    <div className="bg-gradient-to-r from-blue-100 via-gray-200 to-rose-100 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <Navbar />
      <motion.div
        className="mt-10 p-6 sm:p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-4xl transition-all duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-800 mb-6 drop-shadow-lg">
          Drone Logs
        </h1>
        {loading ? (
          <div className="flex justify-center items-center space-x-4">
            <ClipLoader size={50} color="#9b4cdb" />
            <span className="text-gray-700 font-semibold text-xl animate-pulse">
              Just a sec... Loading
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto w-fullborder">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 ">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-gray-100 border-gray-300 border-b">
                    Created
                  </th>
                  <th className="py-3 px-4 text-gray-100 border-gray-300 border-b">
                    Country
                  </th>
                  <th className="py-3 px-4 text-gray-100 border-gray-300 border-b">
                    Drone ID
                  </th>
                  <th className="py-3 px-4 text-gray-100 border-gray-300 border-b">
                    Drone Name
                  </th>
                  <th className="py-3 px-4 text-gray-100 border-gray-300 border-b">
                    Celsius
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-300 text-gray-900 hover:bg-gray-100 transition duration-300"
                  >
                    <td className="py-3 px-4 text-center rounded-l-lg">
                      {log.created}
                    </td>
                    <td className="py-3 px-4 text-center">{log.country}</td>
                    <td className="py-3 px-4 text-center">{log.drone_id}</td>
                    <td className="py-3 px-4 text-center">{log.drone_name}</td>
                    <td className="py-3 px-4 text-center rounded-r-lg">
                      {log.celsius}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex flex-row justify-center items-center gap-4 py-2 w-full flex-wrap">
              {/* Dropdown for Page Selection */}
              <FormControl variant="outlined" size="small" className="w-auto">
                <InputLabel>Page</InputLabel>
                <Select
                  value={currentPage}
                  onChange={handleDropdownChange}
                  label="Page"
                >
                  {pageNumbers.map((pageNumber) => (
                    <MenuItem key={pageNumber} value={pageNumber}>
                      Page {pageNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Pagination Buttons */}
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                color="primary"
                size="large"
                siblingCount={2}
                boundaryCount={2}
                showFirstButton
                showLastButton
                className="flex justify-center items-center"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
