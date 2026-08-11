import { Routes, Route } from "react-router-dom";

import StoreLayout from "./layout/StoreLayout/StoreLayout";

import Home from "./pages/Home/Home";

// Store--------------------------------------
import StoreProducts from "./pages/Store/Product/Products";
import StoreProductDetail from "./pages/Store/Product/ProductDetail";
// Admin---------------------------------------
import AdminLayout from "./layout/AdminLayout/AdminLayout";

// Product Admin----------------------------------------------
import Products from "./pages/Admin/Products/Products";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import EditProduct from "./pages/Admin/Products/EditProduct";
import ProductDetail from "./pages/Admin/Products/ProductDetail";

// Category Admin--------------------------------------------------
import Categories from "./pages/Admin/Categories/Categories";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import EditCategory from "./pages/Admin/Categories/EditCategory";
//component----------------------------------
function App() {
    return (
        <Routes>

            {/* Store------------------------------------ */}
            <Route path="/" element={<StoreLayout />}>

                <Route index element={<Home />} />

                <Route
                    path="products"
                    element={<StoreProducts />}
                />

                <Route
                    path="products/:id"
                    element={<StoreProductDetail />}
                />

            </Route>


            {/* Admin------------------------------------------- */}
            <Route path="/admin" element={<AdminLayout />}>

                {/* Products------------------------------------- */}
                <Route
                    path="products"
                    element={<Products />}
                />

                <Route
                    path="products/create"
                    element={<CreateProduct />}
                />

                <Route
                    path="products/edit/:id"
                    element={<EditProduct />}
                />

                <Route
                    path="products/:id"
                    element={<ProductDetail />}
                />


                {/* Categories------------------------------- */}
                <Route
                    path="categories"
                    element={<Categories />}
                />

                <Route
                    path="categories/create"
                    element={<CreateCategory />}
                />

                <Route
                    path="categories/edit/:id"
                    element={<EditCategory />}
                />

            </Route>

        </Routes>
    );
}

export default App;
