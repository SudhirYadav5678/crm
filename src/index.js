import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import bcrypt from "bcryptjs";
dotenv.config({ path: "../.env" });



const app = express();
app.use(express.json());
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running ${process.env.PORT}`);
});
/**
 * Make mogodb connection
 */
(async () => {
    try {
        await mongoose.connect(process.env.MOGODB_URI);
        console.log("Databse connected");

        /**
         * default admin created from begning.
         */
        const admin_user = await User.findOne({ userId: "admin" });
        if (!admin_user) {
            //creating admin user
            const admin = await User.create({
                name: "one_admin",
                userId: "admin",
                email: "admin@admin.com",
                userType: ADMIN,
                password: bcrypt.hashSync("123456", 8),
            })
            console.log("admin accounted created", admin);

        } else {
            console.log("Admin exits");
        }

    } catch (error) {
        console.error("Error while connection to server", error);
        process.exit(1);
    }
})