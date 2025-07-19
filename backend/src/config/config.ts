import dotenv from "dotenv";

dotenv.config();

export enum CollectionListNames {
    USER = "user", PRODUCT = "product", ORDER = "order", CART = "cart"
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
    collectionList: [CollectionListNames.USER, CollectionListNames.PRODUCT, CollectionListNames.ORDER, CollectionListNames.CART],
};

export default config;
