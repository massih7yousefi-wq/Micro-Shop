import {
    Routes,
    Route,
} from "react-router-dom";

import StoreLayout
    from "./layout/StoreLayout/StoreLayout";

import Home
    from "./pages/Home/Home";

// Auth--------------------------------------------------------

import Login
    from "./pages/Auth/Login/Login";

import Register
    from "./pages/Auth/Register/Registerts";

import ForgotPassword
    from "./pages/Auth/ForgotPassword/ForgotPassword";

import ResetPassword
    from "./pages/Auth/ResetPassword/ResetPassword";

import ConfirmEmail
    from "./pages/Auth/ConfirmEmail/ConfirmEmail";

// Account-----------------------------------------------------

import ChangePassword
    from "./pages/Account/ChangePassword/ChangePassword";

// Store-------------------------------------------------------

import StoreProducts
    from "./pages/Store/Product/Products";

import StoreProductDetail
    from "./pages/Store/Product/ProductDetail";

// Admin-------------------------------------------------------

import AdminLayout
    from "./layout/AdminLayout/AdminLayout";

import Users
    from "./pages/Admin/Users/Users";

import Products
    from "./pages/Admin/Products/Products";

import CreateProduct
    from "./pages/Admin/Products/CreateProduct";

import EditProduct
    from "./pages/Admin/Products/EditProduct";

import ProductDetail
    from "./pages/Admin/Products/ProductDetail";

import Categories
    from "./pages/Admin/Categories/Categories";

import CreateCategory
    from "./pages/Admin/Categories/CreateCategory";

import EditCategory
    from "./pages/Admin/Categories/EditCategory";

// Routes------------------------------------------------------

import ProtectedRoute
    from "./routes/ProtectedRoute";

import AdminRoute
    from "./routes/AdminRoute";

// App---------------------------------------------------------

function App() {

    return (
        <Routes>

            {/* ==================================================
                Public Store
            ================================================== */}

            <Route
                path="/"
                element={<StoreLayout />}
            >

                <Route
                    index
                    element={<Home />}
                />

                <Route
                    path="products"
                    element={<StoreProducts />}
                />

                <Route
                    path="products/:id"
                    element={
                        <StoreProductDetail />
                    }
                />

            </Route>


            {/* ==================================================
                Public Authentication
            ================================================== */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />

            <Route
                path="/confirm-email"
                element={<ConfirmEmail />}
            />


            {/* ==================================================
                Protected User Routes
            ================================================== */}

            <Route
                element={<ProtectedRoute />}
            >

                <Route
                    path="/account/change-password"
                    element={
                        <ChangePassword />
                    }
                />

            </Route>


            {/* ==================================================
                Protected Admin Routes
            ================================================== */}

            <Route
                element={<AdminRoute />}
            >

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    {/* ------------------------------------------
                        Users
                    ------------------------------------------ */}

                    <Route
                        path="users"
                        element={<Users />}
                    />


                    {/* ------------------------------------------
                        Products
                    ------------------------------------------ */}

                    <Route
                        path="products"
                        element={<Products />}
                    />

                    <Route
                        path="products/create"
                        element={
                            <CreateProduct />
                        }
                    />

                    <Route
                        path="products/edit/:id"
                        element={
                            <EditProduct />
                        }
                    />

                    <Route
                        path="products/:id"
                        element={
                            <ProductDetail />
                        }
                    />


                    {/* ------------------------------------------
                        Categories
                    ------------------------------------------ */}

                    <Route
                        path="categories"
                        element={<Categories />}
                    />

                    <Route
                        path="categories/create"
                        element={
                            <CreateCategory />
                        }
                    />

                    <Route
                        path="categories/edit/:id"
                        element={
                            <EditCategory />
                        }
                    />

                </Route>

            </Route>

        </Routes>
    );
}

export default App;

