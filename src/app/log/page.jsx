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
  Container,
} from "@mui/material";

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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, md: 12 },
        background: "linear-gradient(to bottom right, #ebf8ff, #e2e8f0, #fecdd3)",
      }}
    >
      <Navbar />

      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "white",
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          boxShadow: 3,
          width: "100%",
        }}
      >
        <Typography variant="h4" className="font-extrabold text-center text-gray-800 mb-5 py-3 text-xl sm:text-3xl">
        Log Temperature
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Temperature (°C)"
            variant="outlined"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            sx={{
              mb: 3,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1rem",
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#388E3C" },
            }}
          >
            Submit
          </Button>
        </form>
      </Container>

      {/* Popup Dialog */}
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
            minWidth: { xs: "80%", md: "400px" },
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
              borderRadius: "12px",
              fontSize: "14px",
              textAlign: "center",
              padding: "12px 20px",
              backgroundColor:
                dialogSeverity === "success" ? "#e8f5e9" : "#fbe9e7",
              color: dialogSeverity === "success" ? "#388E3C" : "#D32F2F",
            }}
          >
            {dialogMessage}
          </Alert>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => setOpenDialog(false)}
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
    </Box>
  );
}
