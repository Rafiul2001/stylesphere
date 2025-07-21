import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { database } from "../mongodb_connection/connection";
import { CollectionListNames } from "../config/config";
import { encryptPassword, matchPassword } from "../tools/passwordEncrypter";

const user_router = Router()

// Get User Details By Login
user_router.get('/login', async (req: Request<{}, {}, Partial<User>>, res: Response) => {
    const { userEmail, userPhoneNumber, userPassword } = req.body;

    if ((userEmail || userPhoneNumber) && userPassword) {
        try {
            const query: any = { $or: [] };

            if (userEmail) query.$or.push({ userEmail });
            if (userPhoneNumber) query.$or.push({ userPhoneNumber });

            const existingUser = await database.collection<User>(CollectionListNames.USER).findOne(query);

            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordMatch = await matchPassword(userPassword, existingUser.userPassword);

            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            return res.status(200).json({ message: "User logged in", user: existingUser });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(400).json({ message: "Email or phone number and password are required" });
    }
})

// Register User
user_router.post('/register', async (req: Request<{}, {}, Partial<User>>, res: Response) => {
    try {
        const [userName, userPhoneNumber, userEmail, userPassword, userImage] = [req.body.userName, req.body.userPhoneNumber, req.body.userEmail, req.body.userPassword, req.body.userImage]
        if ((userEmail || userPhoneNumber) && userName && userPassword) {
            const encryptedPassword = await encryptPassword(userPassword)
            const newUser = new User({
                userName: userName,
                userPassword: encryptedPassword,
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