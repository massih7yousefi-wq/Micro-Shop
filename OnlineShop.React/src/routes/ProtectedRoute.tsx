import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute() {

    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    const location =
        useLocation();

    // Authentication state is still loading----------------------------------------

    if (isLoading) {
        return (
            <div className="route-loading">
                <span>Loading...</span>
            </div>
        );
    }

    // User is not authenticated----------------------------------------

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

    // User is authenticated----------------------------------------

    return <Outlet />;
}