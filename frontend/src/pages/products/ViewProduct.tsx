import { useParams } from "react-router"
import { productStore } from "../../store/productStore"
import { useState } from "react"

const ViewProduct = () => {
    const params = useParams<{ productId: string }>()
    const product = productStore((s) => s.products.find((item) => item._id === params.productId))
    const [productImageToDisplay, setProductImageToDisplay] = useState("")

    return (
        <div className="py-4">
            <div className="flex flex-row gap-8">
                <div className="max-w-sm">
                    <img src={productImageToDisplay ? productImageToDisplay : product?.sizeWiseQuantity[0].image} alt="Product Image" />
                    <div className="border-2 grid grid-cols-4 gap-2">
                        {
                            [...new Set(product?.sizeWiseQuantity.map(item => item.image))].map((image, index) => (
                                <img onClick={() => setProductImageToDisplay(image)} className="w-20 cursor-pointer" key={index} src={image} alt="Other Image" />
                            ))
                        }
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ViewProduct