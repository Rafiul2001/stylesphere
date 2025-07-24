import { Router, Response } from "express"
import { AuthenticatedRequest, strictToLogin } from "../middlewares/auth"
import { database } from "../mongodb_connection/connection"
import { Cart, CartItem } from "../models/cart"
import { CollectionListNames } from "../config/config"

const cart_router = Router()

// Get Cart By User Id
cart_router.get('/get-cart', strictToLogin, async (req: AuthenticatedRequest<{ cartId: string }, {}, {}>, res: Response) => {
    const userId = req.user?.userId
    try {
        const cart = await database.collection<Cart>(CollectionListNames.CART).findOne({
            userId: userId
        })
        res.status(200).json({
            message: "User Cart",
            value: cart
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }
})

// Update cart items
cart_router.put('/update', strictToLogin, async (req: AuthenticatedRequest<{}, {}, { cartItems: CartItem[] }>, res: Response) => {
    const userId = req.user?.userId
    const cartItems = req.body.cartItems
    try {
        // Persist the updated cart
        const cart = await database.collection<Cart>(CollectionListNames.CART).findOneAndUpdate(
            {
                userId: userId
            },
            {
                $set: {
                    cartItems: cartItems
                }
            },
            { returnDocument: "after" }
        )
        return res.status(200).json({
            message: 'Cart is updated',
            value: cart,
        })
    } catch (error) {
        console.error('Error adding item to cart:', error)
        return res.status(500).json({
            message: 'Internal server error',
            error: (error as Error).message,
        })
    }
})

export default cart_router