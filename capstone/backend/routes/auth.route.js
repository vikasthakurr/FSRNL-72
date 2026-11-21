import express from "express";
import register from "../controllers/usercontroller/register.controller.js";
import login from "../controllers/usercontroller/login.controller.js";
import getProfile from "../controllers/usercontroller/getProfile.controller.js";
import updateProfile from "../controllers/usercontroller/updateProfile.controller.js";
import {
  loginLimiter,
  registerLimiter,
  updateProfileLimiter,
} from "../config/rateLimit.config.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";
import verifyToken from "../middleware/verifyToken.middle.js";
const authRoute = express.Router();
authRoute.post("/register", registerLimiter, validateRegister, register);
authRoute.post("/login", loginLimiter, validateLogin, login);
//protected routes
authRoute.get("/profile", verifyToken, getProfile);
authRoute.put("/update", verifyToken, updateProfileLimiter, updateProfile);
export default authRoute;
