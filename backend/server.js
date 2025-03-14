const express = require("express");
const mongoose = require("mongoose");
const bankRoutes = require("./routes/bankRoutes");
const applicationRoutes = require("./routes/applicationRoutes"); // Add this line
const branchRoutes = require("./routes/branchRoutes"); // Add this line
const authRoutes = require("./routes/authRoutes"); // Add this line
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Allow requests from http://localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/branches", branchRoutes);

app.use("/api", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
