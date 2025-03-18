"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogPage() {
  const [temperature, setTemperature] = useState("");
  const [droneConfig, setDroneConfig] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

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

      setDialogMessage("✅ Temperature logged successfully!");
      setDialogSeverity("success");
      setOpenDialog(true);
      setTemperature("");
    } catch (error) {
      console.error("Error submitting log:", error);
      setDialogMessage("❌ Failed to log temperature");
      setDialogSeverity("error");
      setOpenDialog(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-gray-200 to-rose-100 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Navbar />
      <Box
        component="div"
        sx={{
          mt: 6,
          p: 6,
          sm: 6,
          bgcolor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
          maxWidth: "400px",
          width: "100%",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: "#333" ,marginBottom: "20px"}}
        >
          Log Temperature
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Temperature (°C)"
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
          >
            Submit Data
          </Button>
        </form>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            minWidth: "300px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            color: dialogSeverity === "success" ? "#4CAF50" : "#F44336",
          }}
        >
          {dialogSeverity === "success" ? "Success!" : "Error!"}
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <Alert
            severity={dialogSeverity}
            sx={{
              width: "100%",
              borderRadius: "12px", // Softer rounded corners
              fontSize: "14px", // Smaller font size
              textAlign: "center",
              padding: "12px 20px", // Adjust padding to be more compact
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for a clean look
              backgroundColor:
                dialogSeverity === "success" ? "#e8f5e9" : "#fbe9e7", // Subtle background color
              color: dialogSeverity === "success" ? "#388E3C" : "#D32F2F", // Text color matching the severity
            }}
          >
            {dialogMessage}
          </Alert>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            sx={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
