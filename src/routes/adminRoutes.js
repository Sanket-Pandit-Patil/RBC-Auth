import express from "express";
import { createService, createZone } from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateMiddleware.js";
import { validateNameOnly } from "../utils/validators.js";

const router = express.Router();

router.post(
  "/services",
  protect,
  authorizeRoles("ADMIN"),
  validateRequest((body) => validateNameOnly(body, "name")),
  createService
);

router.post(
  "/zones",
  protect,
  authorizeRoles("ADMIN"),
  validateRequest((body) => validateNameOnly(body, "name")),
  createZone
);

export default router;