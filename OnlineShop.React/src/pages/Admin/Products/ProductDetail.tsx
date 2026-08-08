//imports-------------------------------------------
import {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { productService } from "../../../services/productService";
import type { Product } from "../../../models/Product/Product";
import { API_BASE } from "../../../services/api";

import "./ProductDetail.css";
//component----------------------------------
const ProductDetail = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            try{
                const data = await productService.getById(
                    Number(id)
                );
                setProduct(data);
            }
            finally {
                setLoading(false);
            }
        };
        void loadProduct();
    },[id]);

    if (loading)
        return <h2>Loading...</h2>;


    if (!product)
        return <h2>Product not found.</h2>;
    return (
        <div className="product-detail-page">
            <button className="product-detail-back-button"
                onClick={() => navigate("/admin/products")}
            >
                ← Back
            </button>

            <h1 className="product-detail-title">
                {product.name}
            </h1>


            <p className="product-detail-description">
                {product.description}
            </p>


            <p className="product-detail-price">
                Price: ${product.price.toFixed(2)}
            </p>


            <p className="product-detail-category">
                Category: {product.categoryName}
            </p>

            <div className="product-detail-images">

                {
                    product.images.map(image => (

                        <img
                            key={image.id}
                            src={`${API_BASE}${image.imageUrl}`}
                            alt={product.name}
                        />

                    ))
                }

            </div>
            </div>
    );

};
export default ProductDetail;