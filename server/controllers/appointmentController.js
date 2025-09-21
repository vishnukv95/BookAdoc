import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import paymentModel from "../models/paymentModel.js";


export const createAppointment = async (req, res) => {
  try {
    const { patientid, doctorid, dateTime } = req.body;

    if (!patientid || !doctorid  ) {
      return res.status(400).json({ error: "All fields are required" });
    }


     const payment = await paymentModel.create({
      appointmentid: null, 
      amount:null,
      status: "pending",
      method
    });

    
    const appointment = await appointmentModel.create({
      patientid,
      doctorid,
      dateTime,
      paymentid:payment._id,
    });

    payment.appointment._id = appointment_.id
    await payment.save()

    res.status(201).json({ message: "Appointment created", appointment,payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getAllAppointments = async (req, res) => {
    
  try {
    const appointments = await appointmentModel.find({})

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("patientid", "name email")
      .populate("doctorid", "name specialization availability")
      .populate("paymentid");

    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["booked", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const appointment = await appointmentModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Status updated", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.findByIdAndDelete(req.params.id);

    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
