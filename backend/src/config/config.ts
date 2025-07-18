import dotenv from "dotenv";

dotenv.config();

export enum CollectionListNames {
    USER, PRODUCT, ORDER, CART
}

interface Config {
    port: number;
    mongodbUrl: string;
    databaseName: string;
    collectionList: string[];
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017/",
    databaseName: process.env.DATABASE_NAME || "poll",
    collectionList: JSON.parse(process.env.COLLECTION_LIST || `["user", "product", "order", "cart"]`),
};

export default config;
