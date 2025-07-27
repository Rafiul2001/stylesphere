export const color = {
    RED: "RED",
    BLUE: "BLUE",
    GREEN: "GREEN",
    YELLOW: "YELLOW",
    BLACK: "BLACK",
    GRAY: "GRAY"
} as const

export enum AvailableSizeKeys {
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL"
}

export type SizeWiseQuantity = {
    size: string
    quantity: number
    color: string
    image: string
}

export class Product {
    productName: string
    productPrice: number
    sizeWiseQuantity: SizeWiseQuantity[]
    totalQuantity: number

    constructor(
        {
            productName,
            productPrice = 0,
            sizeWiseQuantity = []
        }:
            {
                productName: string,
                productPrice?: number
                sizeWiseQuantity?: SizeWiseQuantity[]
            }
    ) {
        this.productName = productName
        this.productPrice = productPrice
        this.sizeWiseQuantity = sizeWiseQuantity
        this.totalQuantity = this.calculateTotalQuantity()
    }

    private calculateTotalQuantity(): number {
        return this.sizeWiseQuantity.reduce((sum, { quantity }) => sum + quantity, 0)
    }
}