import { Router, Request, Response } from "express"
import { User } from "../models/user"
import { database } from "../mongodb_connection/connection"
import { CollectionListNames } from "../config/config"
import { encryptPassword, matchPassword } from "../tools/passwordEncrypter"
import { generateToken } from "../tools/jwt"
import { AuthenticatedRequest, strictToLogin } from "../middlewares/auth"
import { ObjectId } from "mongodb"
import { Cart } from "../models/cart"
import { uploadUserImage } from "../middlewares/imageStorage"
import fs from 'fs/promises' // Use promise-based fs
import path from 'path'

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

            const cart = await database.collection<Cart>(CollectionListNames.CART).findOne({
                userId: existingUser._id.toString()
            })

            const generatedToken = generateToken({ userId: existingUser._id })

            return res.status(200).json({
                message: "User logged in",
                token: generatedToken,
                user: {
                    userName: existingUser.userName,
                    userEmail: existingUser.userEmail,
                    userPhoneNumber: existingUser.userPhoneNumber,
                    userImage: `${req.protocol}://${req.get('host')}/uploads/${existingUser.userImage}`
                },
                cart: cart?._id
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
user_router.post('/register', uploadUserImage.single("userImage"), async (req: Request<{}, {}, Partial<User>>, res: Response) => {
    try {
        const [userName, userPhoneNumber, userEmail, userPassword] = [req.body.userName, req.body.userPhoneNumber, req.body.userEmail, req.body.userPassword]
        const imageFile = req.file
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
                userImage: imageFile?.filename
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

// Delete user by user
user_router.delete('/delete', strictToLogin, async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. User ID missing.' })
    }

    try {
        // Find the user first to get image filename
        const user = await database.collection<User>(CollectionListNames.USER).findOne({ _id: new ObjectId(userId) })

        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        // Build full path to the user image file
        // Adjust this path to match where you save user images
        const imagePath = path.join(__dirname, '..', 'uploads', 'user_images', user.userImage)

        // Delete the image file if it exists
        try {
            await fs.unlink(imagePath)
        } catch (err) {
            // If file does not exist, ignore error, else log it
            if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
                console.error('Error deleting user image:', err)
            }
        }

        // Delete the cart associated with the user
        await database.collection<Cart>(CollectionListNames.CART).deleteOne({ userId });

        // Now delete the user document from DB
        const result = await database.collection<User>(CollectionListNames.USER).deleteOne({ _id: new ObjectId(userId) })

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: 'User deleted successfully' })
        } else {
            return res.status(500).json({ message: 'Failed to delete user' })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error!',
            error: error instanceof Error ? error.message : error
        })
    }
})

export default user_router