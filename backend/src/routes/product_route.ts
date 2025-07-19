import { Router, Request, Response, NextFunction } from "express";
import { CollectionListNames } from "../config/config";
import { database } from "../mongodb_connection/connection";
import { Product } from "../models/product";
import { ObjectId } from "mongodb";

const product_router = Router()

// Get All Products
product_router.get('/all-products', async (req: Request, res: Response) => {
    try {
        const allProducts = await database.collection<Product>(CollectionListNames.PRODUCT).find().toArray()
        res.status(200).json({
            message: "All products",
            value: allProducts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to retrieve products",
            error: (error as Error).message
        })
    }
})

// Get Product By Id
product_router.get('/:id', async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const existingProduct = await database.collection<Product>(CollectionListNames.PRODUCT).findOne({ _id: new ObjectId(req.params.id) })
        res.status(201).json({
            message: "Get product by id",
            value: existingProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to retrieve product",
            error: (error as Error).message
        })
    }
})

// Add a Product
product_router.post('/add-product', async (req: Request<{}, {}, Product>, res: Response) => {
    try {
        const newProduct = new Product(
            {
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                sizeWiseQuantity: req.body.sizeWiseQuantity
            }
        )
        await database.collection(CollectionListNames.PRODUCT).insertOne(newProduct)
        res.status(201).json({
            message: "Product is added to database!",
            value: newProduct.productName
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to add product",
            error: (error as Error).message
        })
    }
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