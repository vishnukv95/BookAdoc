import express from "express";
import {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
} from "../controllers/prescriptionController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const prescriptionRouter = express.Router();

prescriptionRouter.post(
  "/",
  authMiddleware,
  authorizeRoles("doctor", "admin"),
  createPrescription
);

prescriptionRouter.get(
  "/",
  authMiddleware,
  authorizeRoles("doctor", "admin"),
  getAllPrescriptions
);

prescriptionRouter.get(
  "/:id",
  authMiddleware,
  authorizeRoles("patient", "doctor", "admin"),
  getPrescriptionById
);

prescriptionRouter.put(
  "/:id",
  authMiddleware,
  authorizeRoles("doctor", "admin"),
  updatePrescription
);

prescriptionRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deletePrescription
);

export default prescriptionRouter;
