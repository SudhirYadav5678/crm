import { User } from "../models/user.model";


export const validateUserReq = async (req, res, next) => {
    // if (req.body.name) {
    //     res.status(400).send({
    //         message: "Failed! Bad request, username not found"
    //     })
    // }
    const { name, userId, email, password, userType } = req.body;

    if (!name || !userId || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne(userId);
    if (user != null) {
        return res.status(400).send({
            message: "User already exits"
        })
    }

}