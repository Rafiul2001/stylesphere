class Order {
    orderId?: string
    userId: string
    orderedItems: {
        productId: string
        productName: string
        productSize: string
        productQuantity: number
        subTotal: number
    }[]
    totalCost: number

    constructor(
        {
            orderId,
            userId,
            orderedItems = []
        }
            :
            {
                orderId?: string
                userId: string
                orderedItems?: {
                    productId: string
                    productName: string
                    productSize: string
                    productQuantity: number
                    subTotal: number
                }[]
            }
    ) {
        if (orderId) {
            this.orderId = orderId
        }
        this.userId = userId
        this.orderedItems = orderedItems
        this.totalCost = this.calculateTotalCost()
    }

    private calculateTotalCost(): number {
        return this.orderedItems.reduce((sum, { subTotal }) => sum + subTotal, 0)
    }
}