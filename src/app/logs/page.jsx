"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
    fontFamily: "'Roboto', sans-serif", 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "#e2e8f0",
    transition: "background-color 0.3s ease-in-out",
  },
}));

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchLogs = async () => {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      try {
        const response = await axios.get(`/api/logs/${droneId}`);
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-gray-200 to-rose-100 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-20">
      <Navbar />
      <motion.div
        className="mt-10 p-6 sm:p-8 bg-white bg-opacity-40 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-6xl overflow-x-auto transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          className="font-extrabold text-center text-gray-800 mb-5 drop-shadow-lg py-3"
          sx={{
            fontFamily: "'Roboto', sans-serif", 
          }}
        >
          Drone Logs
        </Typography>

        {loading ? (
          <div className="flex flex-col space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={50}
                className="rounded-lg"
              />
            ))}
          </div>
        ) : (
          <Paper
            sx={{ width: "100%", overflow: "hidden" }}
            className="rounded-lg shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table aria-label="logs table" sx={{ borderCollapse: "collapse" }}>
                  <TableHead>
                    <TableRow>
                      {[
                        "Created",
                        "Country",
                        "Drone ID",
                        "Drone Name",
                        "Celsius",
                      ].map((header) => (
                        <TableCell
                          key={header}
                          align="center"
                          sx={{
                            backgroundColor: "#4b5563",
                            color: "#ffffff",
                            fontWeight: "bold",
                            border: "2px solid #4b5563",
                            fontFamily: "'Roboto', sans-serif", 
                          }}
                        >
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {logs
                      .slice(
                        currentPage * rowsPerPage,
                        currentPage * rowsPerPage + rowsPerPage
                      )
                      .map((log, index) => (
                        <StyledTableRow hover key={index}>
                          <StyledTableCell align="center">
                            {log.created}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {log.country}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {log.drone_id}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {log.drone_name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {log.celsius}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={logs.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="bg-gray-100 border-t border-gray-300"
            />
          </Paper>
        )}
      </motion.div>
    </div>
  );
}
