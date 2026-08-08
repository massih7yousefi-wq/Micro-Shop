export interface Category {
    id: number;
    name: string;
    productCount: number;
}
export interface CategoryResult {
    categories: Category[];
    totalCount: number;
    totalPages: number;
}
export interface CreateCategoryDto {
    name: string;
}


export interface UpdateCategoryDto {
    name: string;
}
