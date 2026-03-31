import express from "express";
import { signupProvider, loginUser } from "../controllers/authController.js";
import validateRequest from "../middleware/validateMiddleware.js";
import {
  validateProviderSignup,
  validateLogin,
} from "../utils/validators.js";

const router = express.Router();

router.post("/signup/provider", validateRequest(validateProviderSignup), signupProvider);
router.post("/login", validateRequest(validateLogin), loginUser);

export default router;