//Imports----------------------------------------
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import Home from "./pages/Home/Home";
//product_Admin------------------------------------------------
import Products from "./pages/Admin/Products/Products";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import EditProduct from "./pages/Admin/Products/EditProduct";
import ProductDetail from "./pages/Admin/Products/ProductDetail";
//category_Admin-----------------------------------------------
import Categories from "./pages/Admin/Categories/Categories";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import EditCategory from "./pages/Admin/Categories/EditCategory";

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />

            {/*Admin------------------------------- */}
            <Route path="/admin" element={<AdminLayout />}>
                {/* Products------------------------------- */}
                <Route path="products" element={<Products />} />
                <Route path="products/create" element={<CreateProduct />} />
                <Route path="products/edit/:id" element={<EditProduct />} />
                <Route path="products/:id" element={<ProductDetail />} />
                {/* Category----------------------------------- */}
                <Route path="categories"  element={<Categories />} />
                <Route path="categories/create" element={<CreateCategory />}/>
                <Route path="categories/edit/:id" element={<EditCategory />}/>
            </Route>
        </Routes>
    );
}

export default App;
