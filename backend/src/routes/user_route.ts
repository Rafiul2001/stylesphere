import { Router, Request, Response, NextFunction } from "express";

const user_router = Router()

// Get User Details By Login
user_router.get('/login', (req: Request, res: Response) => {
    res.status(200).send("User Logged In")
})

// Register User
user_router.post('/register', (req: Request, res: Response) => {
    res.status(200).send("Register User")
})

// Update User Information
user_router.put('/:id', (req: Request, res: Response) => {
    res.status(200).send("User Information Is Updated")
})

// Delete Account
user_router.delete('/:id', (req: Request, res: Response) => {
    res.status(200).send("User is deleted!")
})

export default user_router