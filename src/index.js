import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import bcrypt from "bcryptjs";
dotenv.config({ path: "../.env" });



const app = express();

/**
 * Make mogodb connection
 */
(async () => {
    try {
        await mongoose.connect(process.env.MOGODB_URI);
        console.log("Database connection is established");
        const user = await User.findOne({ userId: "admin" });
        console.log("user", user);

        if (!user) {
            const admin = await User.create({
                name: "oneadmin",
                userId: "admin",
                email: "admin@gmail.com",
                password: bcrypt.hashSync("123456", 8),
                userStatus: "APPROVED",
                userType: "ADMIN"
            })
            console.log("Admin ", admin);

        } else {
            console.log("Admin exit");

        }
    } catch (error) {
        console.log("Error while databse connection: ", error);
        process.exit(1);
    }

})();

/**
 * auth routes
 */
import auth_routes from "./routes/auth.routes.js"
app.use("/crm/api/v1/", auth_routes);


app.use(express.json());
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running ${process.env.PORT}`);
});
