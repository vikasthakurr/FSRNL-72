import express from "express";
import getAllKitchens from "../controllers/publiccontroller/getAllKitchens.controller.js";
import getKitchenMenu from "../controllers/publiccontroller/getKitchenMenu.controller.js";
import createKitchen from "../controllers/admincontroller/createKitchen.controller.js";
import getMyKitchen from "../controllers/admincontroller/getMyKitchen.controller.js";
import getKitchenOrders from "../controllers/admincontroller/getKitchenOrders.controller.js";
import verifyToken from "../middleware/verifyToken.middle.js";
import isAdmin from "../middleware/isAdmin.middle.js";
import upload from "../config/multer.config.js";
import { cache } from "../middleware/cache.middle.js";
import {
  kitchenWriteLimiter,
  uploadLimiter,
} from "../config/rateLimit.config.js";
const kitchenRoute = express.Router();
// public
kitchenRoute.get("/", cache(60), getAllKitchens);
// owner (must be declared before "/:kitchenId/...")
kitchenRoute.get("/mine", verifyToken, isAdmin, getMyKitchen);
kitchenRoute.post(
  "/",
  verifyToken,
  isAdmin,
  kitchenWriteLimiter,
  uploadLimiter,
  upload.single("image"),
  createKitchen,
);
kitchenRoute.get("/:kitchenId/menu", cache(60), getKitchenMenu);
kitchenRoute.get("/:kitchenId/orders", verifyToken, isAdmin, getKitchenOrders);
export default kitchenRoute;
