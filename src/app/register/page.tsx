"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/auth";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Register the user using the API service
      const res = await registerUser({ username, email, password });

      // Save the JWT token in localStorage
      localStorage.setItem("token", res.token);

      // Redirect to dashboard after successful registration
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
