import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
    
    try {
    const { username, email, password }= req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Missing fields on signup"
        })
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists"})
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new UserModel ({
        username,
        passwordHash,
        email: email.toLowerCase(),
    });

    await user.save();

    res.status(201).json({ 
        message: "User created",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
     })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error"})
    }
}