import express from "express";
import cors from 'cors'
import product_router from "./routes/product_route";
import order_router from "./routes/order_route";
import user_router from "./routes/user_route";
import cart_router from "./routes/cart_route";

const app = express();
app.use(express.json());
app.use(cors())

//Routes

app.use('/api/user', user_router);
app.use('/api/product', product_router);
app.use('/api/order', order_router);
app.use('/api/cart', cart_router)

export default app;
