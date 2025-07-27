import { Router, Request, Response, NextFunction } from "express";
import { CollectionListNames } from "../config/config";
import { database } from "../mongodb_connection/connection";
import { Product, SizeWiseQuantity } from "../models/product";
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
            message: "Failed to retrieve products"
        })
    }
})

// Get Product By Id
product_router.get('/get-product/:id', async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const existingProduct = await database.collection<Product>(CollectionListNames.PRODUCT).findOne({ _id: new ObjectId(req.params.id) })
        res.status(201).json({
            message: "Get product by id",
            value: existingProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to retrieve product"
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
            message: "Failed to add product"
        })
    }
})

// Update a Product By Id
product_router.put('/update/:id', async (req: Request<{ id: string }, {}, { productPrice?: number, sizeWiseQuantity?: SizeWiseQuantity[] }>, res: Response) => {
    try {
        const { productPrice, sizeWiseQuantity } = req.body
        const updateResult = await database.collection<Product>(CollectionListNames.PRODUCT).findOneAndUpdate(
            {
                _id: new ObjectId(req.params.id)
            },
            {
                $set: {
                    ...(productPrice !== undefined && { productPrice }),
                    ...(sizeWiseQuantity !== undefined && { sizeWiseQuantity }),
                    totalQuantity: sizeWiseQuantity?.reduce((total, value) => total += value.quantity, 0)
                }
            },
            { returnDocument: "after" } // to return updated document
        )

        if (!updateResult) {
            return res.status(404).json({ message: "Product not found" })
        } else {
            res.status(200).json({
                message: "Product is updated!",
                value: updateResult
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to add product"
        })
    }
})

// Delete a Product
product_router.delete('/:id', async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        await database.collection<Product>(CollectionListNames.PRODUCT).deleteOne({ _id: new ObjectId(req.params.id) })
        res.status(200).json({
            message: `Product with ${req.params.id} deleted!`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to add product"
        })
    }
})

export default product_router