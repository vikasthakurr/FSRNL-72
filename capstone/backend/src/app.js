import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoute from "../routes/auth.route.js";
import adminRoute from "../routes/admin.route.js";
import kitchenRoute from "../routes/kitchen.route.js";
import menuRoute from "../routes/menu.route.js";
import orderRoute from "../routes/order.route.js";
import { globalLimiter } from "../config/rateLimit.config.js";
dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(morgan("dev"));
app.use(globalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//api setup
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/kitchen", kitchenRoute);
app.use("/api/menu", menuRoute);
app.use("/api/orders", orderRoute);
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
// global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
    ...(err.errors?.length ? { errors: err.errors } : {}),
  });
});
export default app;
