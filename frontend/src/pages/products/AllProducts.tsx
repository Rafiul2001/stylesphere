import { Link } from "react-router"
import { productStore } from "../../store/productStore"

const AllProducts = () => {
    const products = productStore((s) => s.products)
    
    return (
        <div className="bg-white">
            <div className="flex flex-row py-4">
                <div className="flex-1 max-w-xs">
                    <h3 className="text-2xl font-semibold">Category Section</h3>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div className="flex-1 p-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <Link key={product._id} to={`/products/${product._id}`} className="group p-2 shadow-md shadow-gray-400 rounded-sm">
                                <img
                                    alt={product.sizeWiseQuantity[0].image}
                                    src={product.sizeWiseQuantity[0].image}
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.productName}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.productPrice}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts