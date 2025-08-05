import z from "zod";

export const colors = {
  RED: "RED",
  BLUE: "BLUE",
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  BLACK: "BLACK",
  GRAY: "GRAY"
} as const

export const AvailableSizeKeys = {
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL"
} as const

export const sizeWiseQuantitySchema = z.object({
  size: z.enum(Object.values(AvailableSizeKeys) as [string, ...string[]]),
  quantity: z.number(),
  color: z.enum(Object.values(colors) as [string, ...string[]]),
  image: z.string(),
})

export const productSchema = z.object({
  _id: z.string(),
  productName: z.string(),
  productPrice: z.number(),
  sizeWiseQuantity: z.array(sizeWiseQuantitySchema),
  totalQuantity: z.number()
})

export type TSizeWiseQuantitySchema = z.infer<typeof sizeWiseQuantitySchema>
export type TProductSchema = z.infer<typeof productSchema>