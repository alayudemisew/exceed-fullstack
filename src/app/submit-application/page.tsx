// app/submit-application/page.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import api from "@/utils/axios";

// Function to submit the application using Axios
const submitApplication = async (applicationData: {
  bank_name: string;
  branch_name: string;
  account_name: string;
  account_number: string;
}) => {
  const response = await api.post("/api/applications/submit", applicationData);
  return response.data;
};

const Alert = MuiAlert;

const ApplicationSubmit = () => {
  const [bankName, setBankName] = useState<string>("");
  const [branchName, setBranchName] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [banks, setBanks] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loadingBanks, setLoadingBanks] = useState<boolean>(false);
  const [loadingBranches, setLoadingBranches] = useState<boolean>(false);
  const router = useRouter();

  // Fetch banks when the component loads
  useEffect(() => {
    const fetchBanks = async () => {
      setLoadingBanks(true);
      try {
        const res = await api.get("/api/banks");
        setBanks(res.data);
      } catch (err) {
        setError("Failed to load banks.");
      } finally {
        setLoadingBanks(false);
      }
    };
    fetchBanks();
  }, []);

  // Fetch branches when the bank is selected
  useEffect(() => {
    const fetchBranches = async () => {
      if (!bankName) return;
      setLoadingBranches(true);
      try {
        const res = await api.get(`/api/branches?bank_id=${bankName}`);
        setBranches(res.data);
      } catch (err) {
        setError("Failed to load branches.");
      } finally {
        setLoadingBranches(false);
      }
    };
    fetchBranches();
  }, [bankName]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const applicationData = {
      bank_name: bankName,
      branch_name: branchName,
      account_name: accountName,
      account_number: accountNumber,
    };

    try {
      const res = await submitApplication(applicationData);
      setSuccessMessage("Application submitted successfully!");
      setSnackbarMessage("Application submitted successfully!");
      setOpenSnackbar(true);

      // Optionally, redirect after successful submission
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong, please try again."
      );
      setSnackbarMessage("Error occurred. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Submit Application
        </Typography>

        {/* Bank Name Select */}
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <InputLabel>Bank Name</InputLabel>
          <Select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            label="Bank Name"
          >
            {loadingBanks ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              banks.map((bank) => (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.value}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Branch Name Select */}
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <InputLabel>Branch Name</InputLabel>
          <Select
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            label="Branch Name"
            disabled={!bankName}
          >
            {loadingBranches ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              branches.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.value}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Account Name Input */}
        <TextField
          label="Account Name"
          variant="outlined"
          fullWidth
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        {/* Account Number Input */}
        <TextField
          label="Account Number"
          variant="outlined"
          fullWidth
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {/* Success Message */}
        {successMessage && (
          <Typography color="success" sx={{ mb: 2, textAlign: "center" }}>
            {successMessage}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            padding: 1.5,
            textTransform: "uppercase",
          }}
        >
          Submit Application
        </Button>
      </Box>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={error ? "error" : "success"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ApplicationSubmit;
