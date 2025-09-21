import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { name, email, password, role, specialization, availability, phone } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      specialization: role === "doctor" ? specialization : undefined,
      availability: role === "doctor" ? availability : undefined,
      phone,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    user.password = undefined;

    res.status(201).json({ message: "User registered", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "All fields are required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const verified = await bcrypt.compare(password,user.password);
    if (!verified) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    user.password = undefined;

    res.status(200).json({ message: "Logged in successfully", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
