import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import { Request, Response } from "express";
import jwt  from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
    
    try {
    const { username, email, password }= req.body;

    if (!username || !email || !password) {
        res.status(400).json({
            message: "Missing fields on signup"
        });
        return;
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() })
    if (existingUser) {
        res.status(400).json({ message: "User already exists"});
        return
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

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password.trim()
          ) {
            res.status(400).json({ message: "Missing or invalid fields" });
            return;
        }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await UserModel.findOne({ email: normalizedEmail });
    
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" })
        return;
    }

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) {
        res.status(401).json({ message: "Invalid user och password"});
        return;
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    res.status(200).json({
        message: "Login successful",
        token,  
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
    });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error"})
    }
}
