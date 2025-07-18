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
        productName: string,
        sizeWiseQuantity: { size: string; quantity: number }[] = [],
        productId?: string
    ) {
        this.productName = productName;
        this.sizeWiseQuantity = sizeWiseQuantity;
        if (productId) {
            this.productId = productId;
        }
        this.totalQuantity = this.calculateTotalQuantity();
    }

    private calculateTotalQuantity(): number {
        return this.sizeWiseQuantity.reduce((sum, { quantity }) => sum + quantity, 0);
    }
}

// Example Usage
// const product = new Product("Ball");
// console.log(product);

// const p2 = new Product("Ball", [
//     { size: AvailableSizeKeys.M, quantity: 2 },
//     { size: AvailableSizeKeys.L, quantity: 4 }
// ]);
// console.log(p2);

// const p3 = new Product("Ball", [
//     { size: AvailableSizeKeys.M, quantity: 2 },
//     { size: AvailableSizeKeys.L, quantity: 4 }
// ], "P1");
// console.log(p3);
