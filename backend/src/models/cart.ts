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

    addItemsToCart(cartItem: CartItem) {
        const existingItemIndex = this.cartItems.findIndex(item =>
            item.productId === cartItem.productId &&
            item.productSize === cartItem.productSize
        );

        if (existingItemIndex !== -1) {
            // Item exists, update quantity and subtotal
            const existingItem = this.cartItems[existingItemIndex];
            existingItem.productQuantity += cartItem.productQuantity;
        } else {
            // New item, add to cart
            this.cartItems.push(cartItem);
        }
    }

    removeItemFromCart(productId: string, productSize: AvailableSizeKeys) {
        this.cartItems = this.cartItems.filter(item =>
            !(item.productId === productId && item.productSize === productSize)
        );
    }

}