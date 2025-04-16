import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import workoutSetRoutes from "./routes/workoutSetRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 基本中間件
app.use(cors());
app.use(express.json());

// 連接數據庫
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 路由
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workoutSets", workoutSetRoutes);
app.use("/api/workouts", workoutRoutes);

// 啟動服務器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
