import type { Product, ProductResult } from "../models/Product/Product";

import { api } from "./api";

export const productService = {
    //Get_product---------------------------------
    getProducts: async (
        searchTerm?: string,
        sortColumn?: string,
        sortAscending: boolean = true,
        categoryId?:number,
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<ProductResult> => {

        const response = await api.get<ProductResult>("/products/search", {
            params: {
                searchTerm,
                sortColumn,
                sortAscending,
                categoryId,
                pageNumber,
                pageSize,
            },
        });

        return response.data;
    },
    //GET_BY_ID----------------------
    getById: async (id: number): Promise<Product> => {

        const response = await api.get<Product>(`/products/${id}`);

        return response.data;
    },
    //Create-----------------------------
    create: async (formData: FormData): Promise<Product> => {

        const response = await api.post<Product>(
            "/products",
            formData
        );

        return response.data;
    },
    //Update--------------------------------------
    update: async (
        id: number,
        formData: FormData
    ): Promise<void> => {

        await api.put(
            `/products/${id}`,
            formData
        );
    },
    //Delete--------------------------------------------
    delete: async (id: number): Promise<void> => {

        await api.delete(`/products/${id}`);
    },

};