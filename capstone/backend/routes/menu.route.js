import express from "express";
import addMenuItem from "../controllers/admincontroller/addMenuItem.controller.js";
import updateMenuItem from "../controllers/admincontroller/updateMenuItem.controller.js";
import deleteMenuItem from "../controllers/admincontroller/deleteMenuItem.controller.js";
import verifyToken from "../middleware/verifyToken.middle.js";
import isAdmin from "../middleware/isAdmin.middle.js";
import upload from "../config/multer.config.js";
import { validateMenuItem } from "../validators/menu.validator.js";
import {
  kitchenWriteLimiter,
  uploadLimiter,
} from "../config/rateLimit.config.js";
const menuRoute = express.Router();
menuRoute.use(verifyToken, isAdmin, kitchenWriteLimiter);
menuRoute.post(
  "/:kitchenId",
  uploadLimiter,
  upload.single("image"),
  validateMenuItem,
  addMenuItem,
);
menuRoute.put(
  "/item/:menuId",
  uploadLimiter,
  upload.single("image"),
  updateMenuItem,
);
menuRoute.delete("/item/:menuId", deleteMenuItem);
export default menuRoute;
