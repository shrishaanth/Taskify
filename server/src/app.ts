import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Server is running" }));

// Route mounts will be added here by Person A and Person B (e.g., app.use("/api/auth", authRoutes);)

app.use(errorHandler);

export default app;