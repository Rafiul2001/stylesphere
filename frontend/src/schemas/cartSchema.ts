import z from "zod";
import { AvailableSizeKeys } from "./productSchema";

export const cartItem = z.object({
    productId: z.string(),
    productName: z.string(),
    productSize: AvailableSizeKeys,
    productQuantity: z.number(),
    productPrice: z.number()
})

export const cartSchema = z.object({
    cartItems: z.array(cartItem)
})

export type TCartItem = z.infer<typeof cartItem>
export type TCartSchema = z.infer<typeof cartSchema>