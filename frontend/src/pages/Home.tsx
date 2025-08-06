import { Link } from "react-router"

const Home = () => {

    return (
        <div className="py-2">
            {/* Banner Part Start */}
            <section id="banner">
                <div className="py-32 flex flex-col items-center justify-center">
                    <h1 className="text-6xl uppercase font-semibold text-center">Discover Your Style with</h1>
                    <img className="mt-8" src="/BannerLogo.svg" alt="BannerLogo" />
                    <p className="mt-4 text-lg text-gray-600 max-w-xl text-center">
                        Elevate your wardrobe with our exclusive collection of T-shirts and shirts
                        for both men and women. Fashion that fits your vibe — comfortable, trendy, and affordable.
                    </p>
                    <div className="mt-6">
                        <Link to={`/products`} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>
            {/* Banner Part End */}
        </div>
    )
}

export default Home