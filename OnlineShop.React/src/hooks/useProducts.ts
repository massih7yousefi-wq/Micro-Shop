//imports-------------------------------------------------
import { useCallback, useEffect, useState } from "react";
import type { Product } from "../models/Product/Product";
import { productService } from "../services/productService";

//States---------------------------------------------
export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn, setSortColumn] = useState<string | undefined>();
    const [sortAscending, setSortAscending] = useState(true);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    //useEffect---------------------------------------------
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);

    }, [searchTerm]);
    //handle_search--------------------------------------------
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };
    //LoadProduct------------------------------------------
    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const result = await productService.getProducts(
                debouncedSearchTerm,
                sortColumn,
                sortAscending,
                currentPage,
                10
            );
            setProducts(result.products);
            setTotalPages(result.totalPages);
        } catch (err) {
            console.error(err);
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchTerm,
        currentPage,
        sortColumn,
        sortAscending]);
    //Run_Code----------------------------
    useEffect(() => {
        void loadProducts();
    }, [loadProducts]);
    //Pagination-----------------------------------
    const nextPage = () => {
        setCurrentPage((prev) => (prev >= totalPages ? prev : prev + 1));
    };

    const previousPage = () => {
        setCurrentPage((prev) => (prev <= 1 ? prev : prev - 1));
    };

    const deleteProduct = async (id: number) => {
        await productService.delete(id);
        await loadProducts();
    };

    return {
        products,
        loading,
        error,

        searchTerm,
        handleSearchChange,

        currentPage,
        totalPages,

        nextPage,
        previousPage,

        sortColumn,
        setSortColumn,

        sortAscending,
        setSortAscending,

        reload: loadProducts,
        deleteProduct,
    };
};