import { Router, Request, Response, NextFunction } from "express"
import { AuthenticatedRequest, strictToLogin } from "../middlewares/auth"
import { database } from "../mongodb_connection/connection"
import { DeliveryStatus, Order, OrderItem, PaymentMethod } from "../models/order"
import { CollectionListNames } from "../config/config"
import { ObjectId } from "mongodb"

const order_router = Router()

// Get All Orders
order_router.get('/all-orders', strictToLogin, async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    try {
        const allOrders = await database.collection<Order>(CollectionListNames.ORDER).find({ userId: userId }).toArray()
        res.status(200).json({
            message: "All Orders",
            value: allOrders
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }
})

// Get Order By ID
order_router.get('/get-order/:orderId', strictToLogin, async (req: AuthenticatedRequest<{ orderId: string }, {}, {}>, res: Response) => {
    const orderId = req.params.orderId
    const userId = req.user?.userId
    try {
        const order = await database.collection<Order>(CollectionListNames.ORDER).findOne({
            userId: userId,
            _id: new ObjectId(orderId)
        })
        res.status(200).json({
            message: "Order",
            value: order
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }
})

// Place an Order
order_router.post('/place-order', strictToLogin, async (req: AuthenticatedRequest<{}, {}, {
    orderedItems: OrderItem[],
    paymentMethod: PaymentMethod,
    deliveryAddress: string
}>, res: Response) => {
    const userId = req.user?.userId
    const order = req.body

    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized user!" })
        }

        const newOrder = new Order({
            userId: userId,
            orderedItems: order.orderedItems,
            paymentMethod: order.paymentMethod,
            deliveryAddress: order.deliveryAddress
        })

        // Handle payment methods
        if (newOrder.paymentMethod === PaymentMethod.MOBILE_BANKING) {
            // TODO: Trigger mobile banking payment confirmation logic
            console.log("Mobile Banking selected. Awaiting payment confirmation...")
            // Keep isPaid = false until verified
        } else if (newOrder.paymentMethod === PaymentMethod.VISA_OR_MASTER_CARD) {
            // TODO: Trigger card payment session creation or verify transaction
            console.log("Card payment selected. Awaiting payment confirmation...")
            // Keep isPaid = false until verified
        } else if (newOrder.paymentMethod === PaymentMethod.CASH_ON_DELIVERY) {
            console.log("Cash on Delivery selected. No pre-payment required.")
            // Leave isPaid = false, will be marked after delivery
        } else {
            return res.status(400).json({ message: "Invalid payment method!" })
        }

        await database.collection<Order>(CollectionListNames.ORDER).insertOne(newOrder)

        res.status(200).json({
            message: "Order placed successfully.",
            value: newOrder
        })
    } catch (error) {
        console.error("Error placing order:", error)
        res.status(500).json({
            message: "Internal server error!",
            error: error instanceof Error ? error.message : error
        })
    }
})

order_router.put('/update/:id', strictToLogin, async (req: AuthenticatedRequest<{ id: string }, {}, {
    deliveryStatus?: DeliveryStatus,
    markAsPaid?: boolean
}>, res: Response) => {
    const { id } = req.params
    const { deliveryStatus, markAsPaid } = req.body
    const userId = req.user?.userId

    try {
        const existingOrder = await database.collection<Order>(CollectionListNames.ORDER).findOne({
            _id: new ObjectId(id),
            userId
        })

        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found!" })
        }

        const updateFields: Partial<Order> = {}

        if (deliveryStatus) {
            if (!Object.values(DeliveryStatus).includes(deliveryStatus)) {
                return res.status(400).json({ message: "Invalid delivery status!" })
            }
            updateFields.deliveryStatus = deliveryStatus
        }

        if (markAsPaid === true && !existingOrder.isPaid) {
            updateFields.isPaid = true
            updateFields.paidAt = new Date()
        }

        await database.collection<Order>(CollectionListNames.ORDER).updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        )

        res.status(200).json({ message: "Order updated successfully." })
    } catch (error) {
        console.error("Error updating order:", error)
        res.status(500).json({
            message: "Internal server error!",
            error: error instanceof Error ? error.message : error
        })
    }
})

export default order_router