import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import Stripe from "stripe";
import {getAllPayments,getPayment,updatePaymentStatus,} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.get("/", authMiddleware, authorizeRoles("admin"), getAllPayments);

paymentRouter.get("/:id", authMiddleware, authorizeRoles("admin"), getPayment);

paymentRouter.put("/:id",authMiddleware,authorizeRoles("admin"),updatePaymentStatus);


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe Checkout
paymentRouter.post(
  "/checkout",
  authMiddleware,
  authorizeRoles("patient"),
  async (req, res) => {
    try {
      const { items, patientid, doctorid, date } = req.body;

      const lineItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
        metadata: { patientid, doctorid, date },
      });

      res.json({ id: session.id, url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "stripe error" });
    }
  }
);

export default paymentRouter;
