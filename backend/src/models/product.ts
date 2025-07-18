export enum AvailableSizeKeys {
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL"
}

export class Product {
    productId?: string
    productName: string
    productPrice: number
    sizeWiseQuantity: { size: string; quantity: number }[]
    totalQuantity: number

    constructor(
        {
            productName,
            productPrice = 0,
            sizeWiseQuantity = [],
            productId
        }:
            {
                productName: string,
                productPrice?: number
                sizeWiseQuantity?: { size: string; quantity: number }[],
                productId?: string
            }
    ) {
        if (productId) {
            this.productId = productId
        }
        this.productName = productName
        this.productPrice = productPrice
        this.sizeWiseQuantity = sizeWiseQuantity
        this.totalQuantity = this.calculateTotalQuantity()
    }

    private calculateTotalQuantity(): number {
        return this.sizeWiseQuantity.reduce((sum, { quantity }) => sum + quantity, 0)
    }
}