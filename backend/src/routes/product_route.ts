import { Router, Request, Response, NextFunction } from "express";

const product_router = Router()

// Get All Products
product_router.get('/all-products', (req: Request, res: Response) => {
    res.status(200).send("All Products")
})

// Get Product By Id
product_router.get('/:id', (req: Request, res: Response) => {
    res.status(200).send(req.params.id)
})

// Add a Product
product_router.post('/add-product', (req: Request, res: Response) => {
    res.status(200).send("Add Product Route")
})

// Update a Product By Id
product_router.put('/:id', (req: Request, res: Response) => {
    res.status(200).send(req.params.id)
})

// Delete a Product
product_router.delete('/:id', (req: Request, res: Response) => {
    res.status(200).send(req.params.id)
})

export default product_router