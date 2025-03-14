import api from "@/utils/axios";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

// Register User API
export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/api/auth/register", data);
  return response.data; // Contains the JWT token and user data
};

// Login User API
export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/api/auth/login", data);
  return response.data; // Contains the JWT token and user data
};
