import { Router, Request, Response, NextFunction } from "express"
import { strictToLogin } from "../middlewares/auth"
import { database } from "../mongodb_connection/connection"
import { Cart, CartItem } from "../models/cart"
import { CollectionListNames } from "../config/config"
import { ObjectId } from "mongodb"

const cart_router = Router()

// Get Cart By ID
cart_router.get('/:cartId', strictToLogin, async (req: Request<{ cartId: string }, {}, {}>, res: Response) => {
    const cartId = req.params.cartId
    try {
        const cart = await database.collection<Cart>(CollectionListNames.CART).findOne({ _id: new ObjectId(cartId) })
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

// Add an Item to Cart
cart_router.put('/add-item/:cartId', strictToLogin, async (req: Request<{ cartId: string }, {}, { cartItem: CartItem }>, res: Response) => {
    const cartId = req.params.cartId
    const newCartItem = req.body.cartItem
    try {
        const cart = await database.collection<Cart>(CollectionListNames.CART).findOne({ _id: new ObjectId(cartId) })
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                cartId,
            })
        }
        // Add or update item in cart
        cart.addItemsToCart(newCartItem)
        // Persist the updated cart
        await database.collection<Cart>(CollectionListNames.CART).updateOne(
            {
                _id: cart._id
            },
            {
                $set: {
                    cartItems: cart.cartItems
                }
            }
        )
        return res.status(200).json({
            message: 'Added item to cart',
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

// Remove an item from cart
cart_router.put('/remove-item/:cartId', strictToLogin, async (req: Request<{ cartId: string }, {}, { cartItem: Partial<CartItem> }>, res: Response) => {
    const cartId = req.params.cartId
    const cartItem = req.body.cartItem
    try {
        // Validate required fields
        if (!cartItem.productId || !cartItem.productSize) {
            return res.status(400).json({
                message: 'Missing productId or productSize in request body',
            })
        }
        // Find the cart
        const cart = await database.collection<Cart>(CollectionListNames.CART).findOne({ _id: new ObjectId(cartId) })
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                cartId,
            })
        }
        // Remove the item using a method on the Cart class/object
        cart.removeItemFromCart(cartItem.productId, cartItem.productSize)
        // Update the cart in the database
        await database.collection<Cart>(CollectionListNames.CART).updateOne(
            {
                _id: cart._id
            },
            {
                $set: {
                    cartItems: cart.cartItems
                }
            }
        )
        return res.status(200).json({
            message: 'Removed item from cart',
            value: cart,
        })
    } catch (error) {
        console.error('Error removing item from cart:', error)
        return res.status(500).json({
            message: 'Internal server error',
            error: (error as Error).message,
        })
    }
})


export default cart_router