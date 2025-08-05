import { useParams } from "react-router"

const ViewProduct = () => {
    const params = useParams<{ productId: string }>()
    return (
        <div>
            <h1>View Product</h1>
            <p>{params.productId}</p>
        </div>
    )
}

export default ViewProduct