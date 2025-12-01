

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({
  origin: "https://book-store-29hq.vercel.app/" }));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// MongoDB connection
mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running",
  });
});

// Routes
app.use("/api/book", bookRoute);
app.use("/api/user", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
