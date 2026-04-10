import { Request, Response, Router } from "express";
import UserModel from "../models/User.js";

const router = Router();

// router.get("/", async (req, res) => {
//     try {
//         const users = await UserModel.find()
//         res.json(users)
//     } catch (err) {
//         console.error(err); 
//         res.status(500).json({ message: "Server error"})
//     }
// })

// router.get("/:id", async (req: Request, res: Response) => {
//     try {
//         const users = await UserModel.
//         const user = users.find(u => u.id === parseInt(req.params.id))
//     }
    
//     if (!user) {
//         return res.status(404).json({message: "Finns ingen använderare", error: "user not found"};

//         )
//     }
// })

// router.post("/", (req, res) => {
//     const newUser = { id: users.length + 1, ...req.body};
//     users.push(newUser);
//     res.status(201).json(newUser)
// })
