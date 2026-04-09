import { Request, Response, Router } from "express";

const router = 

app.get("/users/:id", (req: Request, res: Response) =>{
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).json({message: "Finns ingen använderare", error: "user not found"};

        )
    }
})

app.post("/users", (req, res) => {
    const newUser = { id: users.length + 1, ...req.body};
    users.push(newUser);
    res.status(201).json(newUser)
})
