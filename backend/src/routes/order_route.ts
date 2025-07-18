import { Router, Request, Response, NextFunction } from "express";

const order_router = Router()

// Get All Orders
order_router.get('/all-orders', (req: Request, res: Response) => {
    res.status(200).send("All Orders")
})

// Get Order By ID
order_router.get('/:id', (req: Request, res: Response) => {
    res.status(200).send(req.params.id)
})

// Place a Order
order_router.post('/place-order', (req: Request, res: Response) => {
    res.status(200).send("Order Placed")
})

// Update a Order Status
order_router.put('/:id', (req: Request, res: Response) => {
    res.status(200).send("Order Status Updated!")
})

export default order_router