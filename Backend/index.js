
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// Load environment variables FIRST
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running",
  });
});

// API routes
app.use("/api/book", bookRoute);
app.use("/api/user", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
