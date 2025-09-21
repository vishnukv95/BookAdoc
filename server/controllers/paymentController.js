import paymentModel from "../models/paymentModel.js";
import appointmentModel from "../models/appointmentModel.js";





export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid payment status" });
    }

    const payment = await paymentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!payment) return res.status(404).json({ error: "Payment not found" });

    res.status(200).json({ message: "Payment status updated", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await paymentModel.findById(id)

    if (!payment) return res.status(404).json({ error: "Payment not found" });

    res.status(200).json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getAllPayments = async (req, res) => {

   

  try {
    const payments = await paymentModel.find({});

    res.status(200).json({ payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
