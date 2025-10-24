import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import twilioRoutes from "./routes/twilioRoutes";
import { startCron } from "./services/cronServices";

const app = express();
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


connectDB(process.env.MONGO_URI || "");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/twilio", twilioRoutes);


app.get("/health", (_req, res) => res.json({ ok: true }));


startCron();

export default app;
