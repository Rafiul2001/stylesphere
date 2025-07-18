import { Router, Request, Response, NextFunction } from "express";

const cart_router = Router()

// Get Cart By ID
cart_router.get('/:id', (req: Request, res: Response) => {
    res.status(200).send("Cart")
})

// Update Cart
cart_router.put('/:id', (req: Request, res: Response) => {
    res.status(200).send(req.params.id)
})

export default cart_router