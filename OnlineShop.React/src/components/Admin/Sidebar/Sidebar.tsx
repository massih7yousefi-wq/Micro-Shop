import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
    {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: "⌂",
    },
    {
        label: "Products",
        path: "/admin/products",
        icon: "▣",
    },
    {
        label: "Categories",
        path: "/admin/categories",
        icon: "◈",
    },
    {
        label: "Orders",
        path: "/admin/orders",
        icon: "□",
    },
    {
        label: "Users",
        path: "/admin/users",
        icon: "♙",
    },
];

const Sidebar = () => {
    return (
        <aside className="sidebar">

            {/* Logo */}
            <div className="sidebar-header">

                <NavLink
                    to="/admin/dashboard"
                    className="sidebar-brand"
                >

                    <div className="admin-logo-mark">
                        <span className="admin-logo-line admin-logo-line--left" />
                        <span className="admin-logo-line admin-logo-line--center" />
                        <span className="admin-logo-line admin-logo-line--right" />
                    </div>

                    <div className="sidebar-brand-content">

                        <strong>
                            Micro Shop
                        </strong>

                        <span>
                            Admin Panel
                        </span>

                    </div>

                </NavLink>

            </div>


            {/* Navigation */}
            <div className="sidebar-section">

                <span className="sidebar-section-label">
                    Overview
                </span>

                <nav className="sidebar-menu">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link ${
                                    isActive
                                        ? "sidebar-link-active"
                                        : ""
                                }`
                            }
                        >

                            <span className="sidebar-link-icon">
                                {item.icon}
                            </span>

                            <span className="sidebar-link-text">
                                {item.label}
                            </span>

                            <span className="sidebar-link-indicator" />

                        </NavLink>

                    ))}

                </nav>

            </div>


            {/* Footer */}
            <div className="sidebar-footer">

                <div className="sidebar-footer-line" />

                <NavLink
                    to="/"
                    className="sidebar-link sidebar-link-shop"
                >

                    <span className="sidebar-link-icon">
                        ↗
                    </span>

                    <span className="sidebar-link-text">
                        Back to Shop
                    </span>

                </NavLink>


                <div className="sidebar-status">

                    <span className="sidebar-status-dot" />

                    <div>

                        <strong>
                            System Online
                        </strong>

                        <span>
                            Everything looks good
                        </span>

                    </div>

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;