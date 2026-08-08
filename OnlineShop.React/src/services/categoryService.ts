//imports----------------------------------
import type {
    Category,
    CategoryResult,
    CreateCategoryDto,
    UpdateCategoryDto
} from "../models/Category/Category";

import { api } from "./api";

//component--------------------------------
export const categoryService = {
    //Get_All-------------------------------
    GetAll: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>("/categories");

        return response.data;
    },
    //Get_By_Id-------------------------------
    getById: async (id: number): Promise<Category> => {
        const response = await api.get<Category>(
            `/categories/${id}`
        );

        return response.data;
    },
    //Search_sort_pagination-----------------------------
    getCategories: async (
        searchTerm?: string,
        sortColumn?: string,
        sortAscending: boolean = true,
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<CategoryResult> => {

        const response = await api.get<CategoryResult>(
            "/categories/search",
            {
                params: {
                    searchTerm,
                    sortColumn,
                    sortAscending,
                    pageNumber,
                    pageSize
                }
            }
        );

        return response.data;
    },
    //Create-------------------------------------------
    create: async (
        dto: CreateCategoryDto
    ): Promise<Category> => {

        const response = await api.post<Category>(
            "/categories",
            dto
        );

        return response.data;
    },
    //Update-------------------------------------------------
    update: async (
        id: number,
        dto: UpdateCategoryDto
    ): Promise<void> => {

        await api.put(
            `/categories/${id}`,
            dto
        );
    },
    //Delete------------------------------------------------
    delete: async (
        id: number
    ): Promise<void> => {

        await api.delete(
            `/categories/${id}`
        );
    }
};