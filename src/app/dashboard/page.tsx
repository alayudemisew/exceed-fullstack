"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/utils/axios";

interface User {
  username: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      //   if (!token) {
      //     router.push("/login"); // Redirect to login if no token
      //     return;
      //   }

      try {
        const res = await api.get("/api/banks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        router.push("/login"); // Redirect to login if token is invalid/expired
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Welcome, {user.username}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
