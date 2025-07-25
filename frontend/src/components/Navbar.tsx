import { NavLink } from "react-router"

const navItems = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/cart",
        text: "Cart"
    },
    {
        url: "/login",
        text: "Login"
    },
    {
        url: "/register",
        text: "Register"
    },
    {
        url: "/dashboard",
        text: "Dashboard"
    }
]

const Navbar = () => {
    return (
        <div className="container mx-auto flex items-center justify-between py-4">
            <div className="w-60">
                <img className="w-full h-auto" src="/StyleSphere.svg" alt="logo" />
            </div>
            <ul className="flex gap-5">
                {
                    navItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                        `font-semibold text-xl ${isActive ? "text-pink-500" : ""}`
                                    }
                                >
                                    {item.text}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Navbar