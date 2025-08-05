import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Dashboard from "./pages/dashboard/Dashboard"
import NotFound from "./pages/NotFound"
import RootLayout from "./pages/RootLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Orders from "./pages/dashboard/Orders"
import AllProducts from "./pages/products/AllProducts"
import ViewProduct from "./pages/products/ViewProduct"

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "login", Component: Login },
            { path: "register", Component: Register },
            { path: "cart", Component: Cart },
            { path: "*", Component: NotFound }
        ],
    },
    {
        path: "dashboard",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: "all-orders",
                Component: Orders
            }
        ]
    },
    {
        path: "products",
        Component: RootLayout,
        children: [
            { index: true, Component: AllProducts },
            { path: ":productId", Component: ViewProduct }
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App