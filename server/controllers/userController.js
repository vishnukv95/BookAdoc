import userModel from "../models/userModel.js";


export const getAllUsers = async (req, res) => {

    try {
        const users = await userModel.find({}).select("-password"); 
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        
        if (req.user.role === "patient" && req.user._id.toString() !== id) {
            return res.status(403).json({ error: "Access denied" });
        }

        const user = await userModel.findById(id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        
          const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
            new: true,
        }).select("-password");

        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
