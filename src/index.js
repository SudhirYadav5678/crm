import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });
const app = express();


app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running ${process.env.PORT}");
})


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

        } catch (error) {
            console.error("Error while connection to server", error);
        }
    })