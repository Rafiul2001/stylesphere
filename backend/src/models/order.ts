enum PaymentMethod {
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    MOBILE_BANKING = "MOBILE_BANKING",
    VISA_OR_MASTER_CARD = "VISA_OR_MASTER_CARD"
}

class Order {
    public readonly orderId?: string
    public readonly userId: string
    public readonly orderedItems: {
        productId: string
        productName: string
        productSize: string
        productQuantity: number
        subTotal: number
    }[]
    public readonly totalCost: number
    public readonly paymentMethod: string
    public isPaid: boolean
    public paidAt?: Date

    constructor(
        {
            orderId,
            userId,
            orderedItems,
            paymentMethod,
            isPaid = false,
            paidAt
        }
            :
            {
                orderId?: string
                userId: string
                orderedItems: {
                    productId: string
                    productName: string
                    productSize: string
                    productQuantity: number
                    subTotal: number
                }[],
                paymentMethod: string
                isPaid?: boolean
                paidAt?: Date
            }
    ) {
        if (orderId) {
            this.orderId = orderId
        }
        this.userId = userId
        this.orderedItems = orderedItems
        this.totalCost = this.calculateTotalCost()
        this.paymentMethod = paymentMethod
        this.isPaid = isPaid
        this.paidAt = paidAt
    }

    private calculateTotalCost(): number {
        return this.orderedItems.reduce((sum, { subTotal }) => sum + subTotal, 0)
    }

    public markAsPaid() {
        this.isPaid = true
        this.paidAt = new Date()
    }
}