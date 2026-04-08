import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const signup = async (req, res) => {
    
    try {
    const { username, email, password }= req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Missing fields on signup"
        })
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists"})
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new UserModel ({
        username,
        passwordHash,
        email,
    });

    await user.save();

    res.status(200).json({ 
        message: "User created",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
     })
    } catch (err) {
        res.status(500).json({ message: "Server error"})
    }
}