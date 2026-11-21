import express from "express";
import placeOrder from "../controllers/ordercontroller/placeOrder.controller.js";
import verifyPayment from "../controllers/ordercontroller/verifyPayment.controller.js";
import getMyOrders from "../controllers/ordercontroller/getMyOrders.controller.js";
import getOrderById from "../controllers/ordercontroller/getOrderById.controller.js";
import cancelOrder from "../controllers/ordercontroller/cancelOrder.controller.js";
import verifyToken from "../middleware/verifyToken.middle.js";
import { validateOrder } from "../validators/order.validator.js";
import {
  createOrderLimiter,
  paymentLimiter,
} from "../config/rateLimit.config.js";
const orderRoute = express.Router();
orderRoute.use(verifyToken);
orderRoute.post("/", createOrderLimiter, validateOrder, placeOrder);
orderRoute.post("/verify-payment", paymentLimiter, verifyPayment);
orderRoute.get("/", getMyOrders);
orderRoute.get("/:orderId", getOrderById);
orderRoute.patch("/:orderId/cancel", cancelOrder);
export default orderRoute;
