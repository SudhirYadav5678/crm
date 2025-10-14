import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    userType: {
        type: String,
        enum: ["CUSTOMER", "ADMIN", "ENGINEER"],
        required: true,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        enum: ["APPROVED", "PENDING", "BLOCKED"],
        required: true,
        default: "APPROVED"
    },

}, { timestamps: true })

module.exports = model("User", userSchema);