import z from "zod";
import { AvailableSizeKeys } from "./productSchema";

export const paymentMethod = {
    CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
    MOBILE_BANKING: "MOBILE_BANKING",
    VISA_OR_MASTER_CARD: "VISA_OR_MASTER_CARD"
} as const

export const orderItem = z.object({
    productName: z.string(),
    productSize: z.enum(Object.values(AvailableSizeKeys) as [string, ...string[]]),
    productQuantity: z.number(),
    productPrice: z.number(),
    subTotal: z.number()
})

export const orderSchema = z.object({
    orderedItems: z.array(orderItem),
    paymentMethod: z.enum(Object.values(paymentMethod) as [string, ...string[]]),
    deliveryAddress: z.string()
})

export type TOrderItem = z.infer<typeof orderItem>
export type TOrderSchema = z.infer<typeof orderSchema>