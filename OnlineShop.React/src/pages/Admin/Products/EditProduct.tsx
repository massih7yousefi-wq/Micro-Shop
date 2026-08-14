//imports-----------------------------------------------
import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import { useNavigate, useParams } from "react-router-dom";

import { productService } from "../../../services/productService";
import type { ProductImage } from "../../../models/Product/Product";
import CategorySelect from "../../../components/Admin/Category/CategorySelect";

import "./CreateProduct.css";

interface NewImagePreview {
    file: File;
    preview: string;
}
//components-------------------------------------------
const EditProductPage = () => {
    //states-------------------------------------------
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(1);



    const [currentImages, setCurrentImages] = useState<ProductImage[]>([]);

    const [newImages, setNewImages] = useState<NewImagePreview[]>([]);

    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

    const [mainImageId, setMainImageId] = useState<number | null>(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    //useEffect----------------------------------------------
    useEffect(() => {

        const load = async () => {

            if (!id) {
                setLoading(false);
                return;
            }

            try {

                const product = await productService.getById(Number(id));

                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategoryId(product.categoryId);

                setCurrentImages(product.images);

                setMainImageId(
                    product.images.find(image => image.isMain)?.id ?? null
                );

            }
            catch {

                setError("Failed to load product.");

            }
            finally {

                setLoading(false);

            }

        };

        void load();

    }, [id]);

    useEffect(() => {

        return () => {

            newImages.forEach(image => {

                URL.revokeObjectURL(image.preview);

            });

        };

    }, [newImages]);

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {

        if (!e.target.files) return;

        setError("");

        const selectedFiles = Array.from(e.target.files);

        const activeCurrentImages =
            currentImages.length - deletedImageIds.length;

        const availableSlots =
            5 - activeCurrentImages - newImages.length;

        if (availableSlots <= 0) {

            setError("Maximum 5 images are allowed.");

            e.target.value = "";

            return;
        }

        const filesToAdd =
            selectedFiles.slice(0, availableSlots);

        if (selectedFiles.length > availableSlots) {

            setError(
                `Only ${availableSlots} more image(s) can be added.`
            );

        }

        const previews = filesToAdd.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setNewImages(prev => [...prev, ...previews]);

        e.target.value = "";

    };



    const removeNewImage = (index: number) => {

        setNewImages(prev => {

            const image = prev[index];

            if (image) {
                URL.revokeObjectURL(image.preview);
            }

            return prev.filter((_, i) => i !== index);

        });

    };
    const removeCurrentImage = (imageId: number) => {

        setDeletedImageIds(prev => [...prev, imageId]);

        setCurrentImages(prev => {

            const updatedImages =
                prev.filter(image => image.id !== imageId);

            if (mainImageId === imageId) {

                setMainImageId(
                    updatedImages.length > 0
                        ? updatedImages[0].id
                        : null
                );

            }

            return updatedImages;

        });
    };
    const selectMainImage = (imageId: number) => {

        setMainImageId(imageId);

        setCurrentImages(prev =>
            prev.map(image => ({
                ...image,
                isMain: image.id === imageId
            }))
        );

    };



    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (!id)
            return;

        setSaving(true);
        setError("");

        try
        {

            const formData = new FormData();

            formData.append("Name", name);

            formData.append("Description", description);

            formData.append("Price", price.toString());

            formData.append("CategoryId", categoryId.toString());

            if (mainImageId !== null) {

                formData.append(
                    "MainImageId",
                    mainImageId.toString()
                );

            }

            deletedImageIds.forEach(imageId => {

                formData.append(
                    "DeletedImageIds",
                    imageId.toString()
                );

            });

            newImages.forEach(image => {

                formData.append(
                    "NewImages",
                    image.file
                );

            });

            await productService.update(
                Number(id),
                formData
            );

            navigate("/admin/products");

        }
        catch
        {

            setError("Failed to update product.");

        }
        finally
        {

            setSaving(false);

        }

    };



    if (loading)
    {
        return <h2 className="loading-text">Loading...</h2>;
    }



    return (

        <div className="create-product-page">

            <div className="create-product-header">

                <h1 className="create-product-title">
                    Edit Product
                </h1>

                <button
                    className="back-button"
                    type="button"
                    onClick={() => navigate("/admin/products")}
                >
                    ← Back
                </button>

            </div>



            <form
                className="create-product-form"
                onSubmit={handleSubmit}
            >

                {
                    error &&
                    <div className="form-error">
                        {error}
                    </div>
                }



                <div className="form-group">

                    <label>
                        Product Name
                    </label>

                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>
                        Product Description
                    </label>

                    <textarea
                        className="product-description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={5}
                        required
                    />

                </div>



                <div className="form-group">

                    <label>
                        Price ($)
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={e =>
                            setPrice(Number(e.target.value))
                        }
                        required
                    />

                </div>



                <div className="form-group">

                    <label>
                        Category ID
                    </label>

                    <CategorySelect
                        value={categoryId}
                        onChange={setCategoryId}
                    />

                </div>



                <div className="form-group">

                    <label>
                        Current Images
                    </label>

                    {
                        currentImages.length === 0
                        &&
                        <p>No images</p>
                    }

                    <div className="image-preview">

                        {
                            currentImages.length === 0
                                ? <p>No images</p>
                                : currentImages.map(image => (

                                    <div
                                        key={image.id}
                                        className="preview-item"
                                    >

                                        <img
                                            src={image.imageUrl}
                                            alt="Product"
                                        />

                                        <div className="image-actions">

                                            {
                                                image.id === mainImageId ? (

                                                    <span className="main-badge">
                                    Main Image
                                </span>

                                                ) : (

                                                    <button
                                                        type="button"
                                                        className="cancel-button"
                                                        onClick={() =>
                                                            selectMainImage(image.id)
                                                        }
                                                    >
                                                        Set as Main
                                                    </button>

                                                )
                                            }

                                            <button
                                                type="button"
                                                className="remove-image-button"
                                                onClick={() =>
                                                    removeCurrentImage(image.id)
                                                }
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    </div>

                                ))
                        }

                    </div>

                </div>

                <div className="form-group">

                    <label>
                        Add New Images
                    </label>

                    <button
                        type="button"
                        className="add-image-button"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                    >
                        + Add Image
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleImageChange}
                    />

                </div>



                {
                    newImages.length > 0 && (

                        <div className="image-preview">

                            {
                                newImages.map((image, index) => (

                                    <div
                                        key={index}
                                        className="preview-item"
                                    >

                                        <img
                                            src={image.preview}
                                            alt={image.file.name}
                                        />

                                        <p>
                                            {image.file.name}
                                        </p>

                                        <button
                                            type="button"
                                            className="remove-image-button"
                                            onClick={() =>
                                                removeNewImage(index)
                                            }
                                        >
                                            ✕
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }



                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={saving}
                    >
                        {
                            saving
                                ? "Saving..."
                                : "Save Changes"
                        }
                    </button>

                </div>

            </form>

        </div>

    );

};

export default EditProductPage;