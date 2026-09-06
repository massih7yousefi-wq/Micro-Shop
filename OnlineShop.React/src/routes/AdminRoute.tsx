import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function AdminRoute() {

    const {
        user,
        isLoading,
        isAuthenticated,
    } = useAuth();

    const location =
        useLocation();

    // Authentication is loading-----------------------------------------------------

    if (isLoading) {
        return (
            <div className="route-loading">
                <span>Loading...</span>
            </div>
        );
    }

    // Not authenticated-----------------------------------------------------

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    // Authenticated but not Admin-----------------------------------------------------

    const isAdmin =
        user?.roles?.some(
            role =>
                role.toLowerCase() === "admin"
        ) ?? false;

    if (!isAdmin) {

        return (
            <Navigate
                to="/"
                replace
            />
        );
    }
    // Admin-----------------------------------------------------


    return <Outlet />;
}