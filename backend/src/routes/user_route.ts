import { Router, Request, Response, NextFunction } from "express"
import { User } from "../models/user"
import { database } from "../mongodb_connection/connection"
import { CollectionListNames } from "../config/config"
import { encryptPassword, matchPassword } from "../tools/passwordEncrypter"
import { generateToken } from "../tools/jwt"
import { AuthenticatedRequest, strictToLogin } from "../middlewares/auth"
import { ObjectId } from "mongodb"
import { Cart } from "../models/cart"

const user_router = Router()

// Login
user_router.post('/login', async (req: Request<{}, {}, Partial<User>>, res: Response) => {
    const { userEmail, userPhoneNumber, userPassword } = req.body

    if ((userEmail || userPhoneNumber) && userPassword) {
        try {
            const query: any = { $or: [] }

            if (userEmail) query.$or.push({ userEmail })
            if (userPhoneNumber) query.$or.push({ userPhoneNumber })

            const existingUser = await database.collection<User>(CollectionListNames.USER).findOne(query)

            if (!existingUser) {
                return res.status(404).json({ message: "User not found", token: null })
            }

            const isPasswordMatch = await matchPassword(userPassword, existingUser.userPassword)

            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid password", token: null })
            }

            const generatedToken = generateToken({ userId: existingUser._id })

            return res.status(200).json({
                message: "User logged in", token: generatedToken, user: {
                    userName: existingUser.userName,
                    userEmail: existingUser.userEmail,
                    userPhoneNumber: existingUser.userPhoneNumber,
                    userImage: existingUser.userImage
                }
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error" })
        }
    } else {
        return res.status(400).json({ message: "Email or phone number and password are required" })
    }
})

// Register User
user_router.post('/register', async (req: Request<{}, {}, Partial<User>>, res: Response) => {
    try {
        const [userName, userPhoneNumber, userEmail, userPassword, userImage] = [req.body.userName, req.body.userPhoneNumber, req.body.userEmail, req.body.userPassword, req.body.userImage]
        if ((userEmail || userPhoneNumber) && userName && userPassword) {

            const query: any = { $or: [] }

            if (userEmail) query.$or.push({ userEmail })
            if (userPhoneNumber) query.$or.push({ userPhoneNumber })

            const existingUser = await database.collection<User>(CollectionListNames.USER).findOne(query)

            if (existingUser) {
                return res.status(200).json({ message: "User already exists!" })
            }

            const encryptedPassword = await encryptPassword(userPassword)
            const newUser = new User({
                userName: userName,
                userPassword: encryptedPassword,
                userPhoneNumber: userPhoneNumber,
                userEmail: userEmail,
                userImage: userImage
            })
            const insertUserResult = await database.collection<User>(CollectionListNames.USER).insertOne(newUser)
            const newCart = new Cart({
                userId: insertUserResult.insertedId.toString()
            })
            await database.collection<Cart>(CollectionListNames.CART).insertOne(newCart)
            res.status(201).json({
                message: "New user has been registered!"
            })
        } else {
            res.status(400).json({
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
user_router.put('/update', strictToLogin, async (req: AuthenticatedRequest<{}, {}, Partial<User>>, res: Response) => {
    const userId = req.user?.userId
    const [userName, userImage] = [req.body.userName, req.body.userImage]

    try {

        const existingUser = await database.collection<User>(CollectionListNames.USER).findOneAndUpdate(
            {
                _id: new ObjectId(userId)
            },
            {
                $set: {
                    ...(userName !== undefined && { userName }),
                    ...(userImage !== undefined && { userImage })
                }
            },
            { returnDocument: 'after' } // to return updated document
        )

        if (!existingUser) {
            return res.status(200).json({ message: "No user found associated with this token" })
        }
        res.status(200).json({
            message: "User Information Is Updated",
            user: {
                userName: existingUser.userName,
                userImage: existingUser.userImage
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }
})

// Delete Account
user_router.delete('/:id', (req: Request, res: Response) => {
    res.status(200).send("User is deleted!")
})

export default user_router