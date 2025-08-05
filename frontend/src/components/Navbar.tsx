import { NavLink } from "react-router"
import { authStore } from "../store/authStore"

const navItems = [
    { url: "/", text: "Home" },
    { url: "/cart", text: "Cart" },
    { url: "/login", text: "Login", authRequired: false },
    { url: "/register", text: "Register", authRequired: false },
    { url: "/dashboard", text: "Dashboard", authRequired: true },
]

const Navbar = () => {
    const isAuthenticated = authStore((s) => s.isAuthenticated)

    // Filter out login/register when authenticated, and dashboard when not
    const filteredNavItems = navItems.filter((item) => {
        if (item.authRequired === false && isAuthenticated) return false; // hide login/register
        if (item.authRequired === true && !isAuthenticated) return false; // hide dashboard
        return true;
    });

    return (
        <div className="container mx-auto flex items-center justify-between py-4">
            <div className="w-60">
                <img className="w-full h-auto" src="/StyleSphere.svg" alt="logo" />
            </div>
            <ul className="flex gap-5">
                {
                    filteredNavItems.map((item, index) => {
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