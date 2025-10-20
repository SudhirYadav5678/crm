import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

/**
 * Signup controller — handles user registration.
 */
export const signup = async (req, res) => {
    try {
        const { name, userId, email, password, userType } = req.body;

        if (!name || !userId || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Determine user status
        const userStatus =
            !userType || userType === "CUSTOMER" ? "CONFIRMED" : "PENDING";

        // Encrypt password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create user object
        const newUser = await User.create({
            name,
            userId,
            email,
            password: hashedPassword,
            userType,
            userStatus,
        });

        // Response
        res.status(201).json({
            message: "User created successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({
            message: "Internal server error while creating user",
        });
    }
};
