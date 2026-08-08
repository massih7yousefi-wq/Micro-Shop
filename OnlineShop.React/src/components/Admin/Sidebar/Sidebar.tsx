//imports-------------------------------------------
import { NavLink } from "react-router-dom";
import "./Sidebar.css"

//Page-----------------------------------------------
 const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2 className="sidebar-logo-text">Admin Panel</h2>
            </div>
            {/* Menu--------------------- */}
            <nav className="sidebar-menu">
                <NavLink
                    to="/admin/dashboard"
                    className={({isActive}) =>
                        `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}>
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/products"
                    className={({isActive}) =>
                        `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}>
                    Products
                </NavLink>
                <NavLink
                    to="/admin/categories"
                    className={({isActive}) =>
                        `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}>
                    Categories
                </NavLink>
                <NavLink
                    to="/admin/orders"
                    className={({isActive}) =>
                        `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}>
                    Orders
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({isActive}) =>
                        `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}>
                    Users
                </NavLink>
            </nav>
            {/* bottom--------------------- */}
            <div className="sidebar-footer">
                <NavLink to="/"
                    className="sidebar-link sidebar-link-logout">
                    Back to Shop
                </NavLink>
            </div>
        </aside>
    );
 };
export default Sidebar;