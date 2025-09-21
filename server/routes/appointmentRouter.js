import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/", authMiddleware, authorizeRoles("patient"), createAppointment);

appointmentRouter.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "doctor"),

  getAllAppointments
);

appointmentRouter.get(
  "/:id",
  authMiddleware,
  authorizeRoles("patient", "doctor", "admin"),
  getAppointmentById
);

appointmentRouter.put(
  "/:id",
  authMiddleware,
  authorizeRoles("doctor", "admin"),
  updateAppointmentStatus
);

appointmentRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteAppointment
);

export default appointmentRouter;
