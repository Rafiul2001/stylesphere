const products = [
    {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 5,
        name: 'Focus Card Tray',
        href: '#',
        price: '$64',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg',
        imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
    },
    {
        id: 6,
        name: 'Focus Multi-Pack',
        href: '#',
        price: '$39',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg',
        imageAlt: 'Stack of 3 small drab green cardboard paper card refill boxes with white text.',
    },
    {
        id: 7,
        name: 'Brass Scissors',
        href: '#',
        price: '$50',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg',
        imageAlt: 'Brass scissors with geometric design, black steel finger holes, and included upright brass stand.',
    },
    {
        id: 8,
        name: 'Focus Carry Pouch',
        href: '#',
        price: '$32',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
        imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
    },
]


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
                        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200">
                            Browse Products
                        </button>
                    </div>
                </div>
            </section>
            {/* Banner Part End */}

            {/* View All Products Start */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <a key={product.id} href={product.href} className="group">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            {/* View All Products End */}
            <section id="products"></section>
        </div>
    )
}

export default Home