enum AvailableSizeKeys {
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL"
}

class Product {
    productId?: string;
    productName: string;
    sizeWiseQuantity: { size: string; quantity: number }[];
    totalQuantity: number;

    constructor(
        {
            productName,
            sizeWiseQuantity = [],
            productId
        }:
            {
                productName: string,
                sizeWiseQuantity?: { size: string; quantity: number }[],
                productId?: string
            }
    ) {
        if (productId) {
            this.productId = productId;
        }
        this.productName = productName;
        this.sizeWiseQuantity = sizeWiseQuantity;
        this.totalQuantity = this.calculateTotalQuantity();
    }

    private calculateTotalQuantity(): number {
        return this.sizeWiseQuantity.reduce((sum, { quantity }) => sum + quantity, 0);
    }
}

// Example Usage
const product = new Product({
    productName: "Ball"
});
console.log(product);

const p1 = new Product({
    productName: "Ball",
    sizeWiseQuantity: [
        { size: AvailableSizeKeys.L, quantity: 2 },
        { size: AvailableSizeKeys.M, quantity: 20 },
        { size: AvailableSizeKeys.XL, quantity: 42 }
    ]
})

console.log(p1)