import prescriptionModel from "../models/prescriptionModel.js";


export const createPrescription = async (req, res) => {
    try {
        const { appointmentid, doctorid, patientid, medication, notes } = req.body;

        if (!appointmentid || !doctorid || !patientid || !medication) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        const prescription = await prescriptionModel.create({
            appointmentid,
            doctorid,
            patientid,
            medication,
            notes
        });

        res.status(201).json({ message: "Prescription created", prescription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await prescriptionModel.find({})
            .populate('appointmentid doctorid patientid'); 

        res.status(200).json({ prescriptions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getPrescriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await prescriptionModel.findById(id)
            .populate('appointmentid doctorid patientid');

        if (!prescription) return res.status(404).json({ error: "Prescription not found" });

        res.status(200).json({ prescription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const updatePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPrescription = await prescriptionModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true } 
        );

        if (!updatedPrescription) return res.status(404).json({ error: "Prescription not found" });

        res.status(200).json({ message: "Prescription updated", updatedPrescription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPrescription = await prescriptionModel.findByIdAndDelete(id);

        if (!deletedPrescription) return res.status(404).json({ error: "Prescription not found" });

        res.status(200).json({ message: "Prescription deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
