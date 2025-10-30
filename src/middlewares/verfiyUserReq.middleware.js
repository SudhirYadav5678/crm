import { User } from "../models/user.model.js";
import { userType } from "../utils/constant.js";

export const validateUserReq = async (req, res, next) => {
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

    //validate user Type
    const possibleUserType = [userType.customer, userType.engineer, userType.admin,];
    if (userType && !possibleUserType.includes(userType)) {
        return res.status(400).send({
            message: "User Type is not vaild"
        })
    }

    //pass to next function
    next();

}