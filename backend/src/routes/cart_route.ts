import { Router, Request, Response, NextFunction } from "express";
import { strictToLogin } from "../middlewares/auth";
import { database } from "../mongodb_connection/connection";
import { Cart, CartItem } from "../models/cart";
import { CollectionListNames } from "../config/config";
import { ObjectId } from "mongodb";

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

// Add a Item to Cart
cart_router.put('/add-item/:cartId', strictToLogin, async (req: Request<{ cartId: string }, {}, { cartItem: CartItem }>, res: Response) => {
    const cartId = req.params.cartId
    const newCartItem = req.body.cartItem
    try {
        const cart = await database.collection<Cart>(CollectionListNames.CART).findOne({ _id: new ObjectId(cartId) })
        cart?.addItemsToCart(newCartItem)
        res.status(200).json({
            message: "Added an item to cart",
            value: cart
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }
})

// Remove a item from cart
cart_router.put('/remove-item/:cartId', strictToLogin, async (req: Request<{ cartId: string }, {}, { cartItem: Partial<CartItem> }>, res: Response) => {
    const cartId = req.params.cartId
    const cartItem = req.body.cartItem
    try {
        const cart = await database.collection<Cart>(CollectionListNames.CART).findOne({ _id: new ObjectId(cartId) })
        if (cart && cartItem.productId && cartItem.productSize) {
            cart.removeItemFromCart(cartItem.productId, cartItem.productSize)
        }
        res.status(200).json({
            message: "Removed an item from cart",
            value: cart
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }
})

export default cart_router