import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import { Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { Achievements } from "../models/Achievements.js";

interface Achievement {
    title: string,
    description: string,
    criteria: number,
}


// Flytta den här funktionen till en middleware som körs efter login, så att vi kan hantera achievements där i stället. 
const checkForAchievement = (metric: string, userValue: number): Achievement | null => {
    // Find the Achievevement with the matching criteria if there is one.
    const metricArray = Achievements[metric as keyof typeof Achievements]
    const unlocked: Achievement | null = metricArray.filter(ach => userValue >= ach.criteria).pop() || null
 
    // Compare metric with criteria
    // If fulfilled, return achievement
    return unlocked
}

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

export const login = async (req: Request, res: Response) => { // Lägg in en parameter för next() här, så att vi kan köra en middleware efter login som hanterar achievements unlocked vid login
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

    // Ta bort den här snutten och lägg in next() i stället, så att vi kan hantera achievements i en middleware efter login

    user.loginCount = (user.loginCount || 0) + 1
    const achievementUnlocked = checkForAchievement("loginCount", user.loginCount)
    console.log(user);

    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        getJwtSecret(),
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json({
        message: "Login successful",
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

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  
    return res.status(200).json({ message: "Logged out" });
  };
  
function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
  
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
  
    return secret;
  }