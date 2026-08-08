export interface ProductImage {
    id: number;
    imageUrl: string;
    isMain: boolean;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    categoryName: string;
    images: ProductImage[];
}

export interface ProductResult {
    products: Product[];
    totalPages: number;
    totalCount: number;
}

export interface UpdateProductDto {
    name: string;
    description: string;
    price: number;
    categoryId: number;

    newImages: File[];

    deletedImageIds: number[];

    mainImageId: number | null;
}