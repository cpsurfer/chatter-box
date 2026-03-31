/** @format */

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/auth.middleware.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Corrected Code
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB()
		.then(() => console.log("Database connected successfully"))
		.catch((error) => console.error("Database connection failed:", error));
});
