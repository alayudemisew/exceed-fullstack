"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/auth";
import { TextField, Button, Typography, Box, Container } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Login the user using the API service
      const res = await loginUser({ email, password });

      // Save the JWT token in localStorage
      localStorage.setItem("token", res.token);

      // Redirect to dashboard after successful login
      router.push("/submit-application");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
      >
        <Typography variant="h4" className="text-center mb-4 text-gray-700">
          Login
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          required
        />

        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
          required
        />

        {/* Error Message */}
        {error && (
          <Typography variant="body2" className="text-red-500 text-center mb-4">
            {error}
          </Typography>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="py-2"
        >
          Login
        </Button>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <Typography variant="body2" className="text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </Typography>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
