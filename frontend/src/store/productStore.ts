import { create } from "zustand";
import type { TProductSchema } from "../validators/productSchema";

type TProductStore = {
    products: TProductSchema[],
    setProducts: (products: TProductSchema[]) => void,
    clearProducts: () => void
}

export const productStore = create<TProductStore>((set) => ({
    products: [],

    setProducts: (products) => set({
        products: products
    }),

    clearProducts: () => set({
        products: []
    })
}))