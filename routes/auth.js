import express from "express";
import { authSchemas } from "../models/user.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authSchemas.registerSchema),
  register
);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post(
  "/verify",
  validateBody(authSchemas.verificationEmailSchema),
  resendVerifyEmail
);

authRouter.post("/login", validateBody(authSchemas.loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(authSchemas.updateSubscriptionSchema),
  updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;