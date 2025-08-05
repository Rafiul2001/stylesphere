import axios from 'axios'
import { useEffect, useState } from 'react'
import type { TProductSchema } from '../validators/productSchema'

export const AllProductList = () => {
    const [allProducts, setAllProducts] = useState<TProductSchema[]>([])

    const getAllProducts = async (userId: string) => {
        const response = await axios.get<TProductSchema[]>("http://localhost:3000/api/product/all-products").then((res) => res.data).catch((err) => console.log(err))
        if (response) setAllProducts(response)
        return response
    }
    useEffect(() => {
        getAllProducts("123")
    }, [])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {allProducts.map((product) => (
                        <a key={product._id} className="group">
                            <img
                                alt={product.sizeWiseQuantity[0].image}
                                src={product.sizeWiseQuantity[0].image}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">{product.productName}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.productPrice}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
