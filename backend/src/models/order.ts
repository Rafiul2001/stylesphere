export enum PaymentMethod {
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    MOBILE_BANKING = "MOBILE_BANKING",
    VISA_OR_MASTER_CARD = "VISA_OR_MASTER_CARD"
}

export enum DeliveryStatus {
    PENDING = "PENDING",
    PACKED = "PACKED",                 // Items are packed and ready to ship
    SHIPPED = "SHIPPED",               // Order is handed over to courier
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY", // Courier is delivering the package
    DELIVERED = "DELIVERED",           // Successfully delivered
}

type OrderItem = {
    productId: string
    productName: string
    productSize: string
    productQuantity: number
    productPrice: number
    subTotal: number
}

export class Order {
    public readonly orderId?: string
    public readonly userId: string
    public readonly orderedItems: OrderItem[]
    public readonly totalCost: number
    public readonly paymentMethod: PaymentMethod
    public isPaid: boolean
    public paidAt?: Date
    public deliveryAddress: string
    public deliveryStatus: DeliveryStatus

    constructor(
        {
            orderId,
            userId,
            orderedItems,
            paymentMethod,
            isPaid = false,
            paidAt,
            deliveryAddress,
            deliveryStatus = DeliveryStatus.PENDING
        }
            :
            {
                orderId?: string
                userId: string
                orderedItems: OrderItem[],
                paymentMethod: PaymentMethod
                isPaid?: boolean
                paidAt?: Date
                deliveryAddress: string
                deliveryStatus?: DeliveryStatus
            }
    ) {
        if (orderId) {
            this.orderId = orderId
        }
        this.userId = userId
        this.orderedItems = orderedItems
        this.totalCost = this.calculateTotalCost()
        this.deliveryAddress = deliveryAddress
        this.paymentMethod = paymentMethod
        this.isPaid = isPaid
        this.paidAt = paidAt
        this.deliveryStatus = deliveryStatus
    }

    private calculateTotalCost(): number {
        return this.orderedItems.reduce((sum, { subTotal }) => sum + subTotal, 0)
    }

    public markAsPaid() {
        this.isPaid = true
        this.paidAt = new Date()
    }

    public updateDeliveryStatus(deliveryStatus: DeliveryStatus) {
        this.deliveryStatus = deliveryStatus
    }
}