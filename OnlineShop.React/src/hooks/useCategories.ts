//imports----------------------------------------------------
import { useCallback, useEffect, useState } from "react";
import type { Category } from "../models/Category/Category";
import { categoryService } from "../services/categoryService";
//component-----------------------------------------------------
export const useCategories = () => {
    //state----------------------------------------------------
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn,setSortColumn] = useState("Id");
    const [sortAscending,setSortAscending] = useState(true);
    //useEffect---------------------------------------------------
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(search);
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);
    //loadCategory-----------------------------------------------
    const loadCategories = useCallback(async () => {

        try {
            setLoading(true);
            setError("");
            const result =
                await categoryService.getCategories(
                    searchTerm,
                    sortColumn,
                    sortAscending,
                    currentPage,
                    10
                );
            setCategories(result.categories);
            setTotalPages(result.totalPages);
        }
        catch (err) {
            console.error(err);
            setError(
                "Failed to load categories."
            );
        }
        finally {
            setLoading(false);
        }
    }, [
        searchTerm,
        currentPage,
        sortColumn,
        sortAscending
    ]);
    //Sort-----------------------
    const changeSort = (column:string)=>{

        if(sortColumn === column)
        {
            setSortAscending(prev=>!prev);
        }
        else
        {
            setSortColumn(column);
            setSortAscending(true);
        }

        setCurrentPage(1);
    };
    //UseEffect------------------
    useEffect(() => {
        void loadCategories();
    }, [loadCategories]);
    //Pagination-----------------------------
    const nextPage = () => {

        setCurrentPage(prev =>
            prev >= totalPages
                ? prev
                : prev + 1
        );
    };
    const previousPage = () => {
        setCurrentPage(prev =>
            prev <= 1
                ? prev
                : prev - 1
        );
    };
    //DeleteCategory-------------------------------------------
    const deleteCategory = async (
        id: number
    ) => {
        await categoryService.delete(id);
        await loadCategories();
    };
    return {
        categories,
        loading,
        error,
        search,
        setSearch,
        currentPage,
        totalPages,
        nextPage,
        previousPage,
        reload: loadCategories,
        deleteCategory,
        changeSort
    };
};
