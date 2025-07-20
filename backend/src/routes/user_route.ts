import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { database } from "../mongodb_connection/connection";
import { CollectionListNames } from "../config/config";

const user_router = Router()

// Get User Details By Login
user_router.get('/login', (req: Request, res: Response) => {
    res.status(200).send("User Logged In")
})

// Register User
user_router.post('/register', async (req: Request<{}, {}, Partial<User>>, res: Response) => {
    try {
        const [userName, userPhoneNumber, userEmail, userPassword, userImage] = [req.body.userName, req.body.userPhoneNumber, req.body.userEmail, req.body.userPassword, req.body.userImage]
        if (userName && userPassword) {
            const newUser = new User({
                userName: userName,
                userPassword: userPassword,
                userPhoneNumber: userPhoneNumber,
                userEmail: userEmail,
                userImage: userImage
            })
            await database.collection(CollectionListNames.USER).insertOne(newUser)
            res.status(200).json({
                message: "New user has been registered!",
                value: newUser
            })
        } else {
            res.status(200).json({
                message: "Enter a valid username or password!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }
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