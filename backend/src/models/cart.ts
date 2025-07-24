import { AvailableSizeKeys } from "./product"

export type CartItem = {
    productId: string
    productName: string
    productSize: AvailableSizeKeys
    productQuantity: number
    productPrice: number
}

export class Cart {
    userId: string
    cartItems: CartItem[]

    constructor({
        userId,
        cartItems = []
    }: {
        userId: string
        cartItems?: CartItem[]
    }) {
        this.userId = userId
        this.cartItems = cartItems
    }
}