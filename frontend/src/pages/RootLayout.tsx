import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-roboto">
            <div>
                <Navbar />
            </div>
            <div className="flex-1 container mx-auto">
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default RootLayout