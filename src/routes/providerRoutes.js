import express from "express";
import {
  selectServicesAndZones,
  createHandyman,
  getMyProfile,
} from "../controllers/providerController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateMiddleware.js";
import {
  validateCreateHandyman,
  validateServiceZoneSelection,
} from "../utils/validators.js";

const router = express.Router();

router.put(
  "/select-services-zones",
  protect,
  authorizeRoles("PROVIDER"),
  validateRequest(validateServiceZoneSelection),
  selectServicesAndZones
);

router.post(
  "/create-handyman",
  protect,
  authorizeRoles("PROVIDER"),
  validateRequest(validateCreateHandyman),
  createHandyman
);

router.get(
  "/profile",
  protect,
  authorizeRoles("ADMIN", "PROVIDER", "HANDYMAN"),
  getMyProfile
);

export default router;