import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
    try {
    const { username, email, password }= req.body;

    const existingUser = await UserModel.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      passwordHash,
      email: email.toLowerCase()
    });

    await user.save();
    
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      getJwtSecret(),
      { expiresIn: "7d" }
    );
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    const { passwordHash: _, ...userWithoutPassword } = user.toObject();
    
    return res.status(201).json({
      message: "User created",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("[signup] error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const { email, password } = req.body;
    
    const normalizedEmail = email.toLowerCase().trim();

    const user = await UserModel.findOne({ email: normalizedEmail });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      res.status(401).json({ message: "Invalid user och password" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      getJwtSecret(),
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { passwordHash, ...userWithoutPassword } = user.toObject();
    req.body = { user: userWithoutPassword };

    next()

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error"})
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
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
