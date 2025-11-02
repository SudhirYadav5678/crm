import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

/**
 * Signup controller — handles user registration.
 */
export const signup = async (req, res) => {
    try {
        const { name, userId, email, password, userType } = req.body;

        // Validate required fields
        if (!name || !userId || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { userId }],
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or userId already exists",
            });
        }

        // Determine user status
        const userStatus =
            !userType || userType === "CUSTOMER" ? "APPROVED" : "PENDING";

        // Encrypt password (async version preferred)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user record
        const newUser = await User.create({
            name,
            userId,
            email,
            password: hashedPassword,
            userType,
            userStatus: userStatus,
        });

        // Success response
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                userType: newUser.userType,
                userStatus: newUser.userStatus,
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        console.error("❌ Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error while creating user",
            error: error.message,
        });
    }
};
