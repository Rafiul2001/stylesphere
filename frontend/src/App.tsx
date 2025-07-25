import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Dashboard from "./pages/Dashboard"
import ViewProduct from "./pages/ViewProduct"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const App = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-roboto">
                <div>
                    <Navbar />
                </div>
                <div className="flex-1 container mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/product/:id" element={<ViewProduct />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App