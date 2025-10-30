import express from "express";
import { signup } from "../controller/auth.controller.js";
import { validateUserReq } from "../middlewares/verfiyUserReq.middleware.js"
const router = express.Router();

// Define signup route
router.post("/auth/signup", validateUserReq, signup);

export default router;
