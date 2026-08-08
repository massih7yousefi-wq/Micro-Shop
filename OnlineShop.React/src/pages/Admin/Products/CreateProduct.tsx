// src/pages/Admin/Products/CreateProduct.tsx
//imports---------------------------
import {
    useRef,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { productService } from "../../../services/productService";
import CategorySelect from "../../../components/Admin/Category/CategorySelect";
import "./CreateProduct.css";
//newImage-------------------------------
interface NewImagePreview {
    file: File;
    preview: string;
}
//component-------------------------------------------
const CreateProductPage = () => {
    //state----------------------------------------------
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(1);

    const [images, setImages] = useState<NewImagePreview[]>([]);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //manage_Image---------------------------------
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (!e.target.files) return;

        setError("");

        const selectedFiles = Array.from(e.target.files);

        const availableSlots = 5 - images.length;

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

        setImages(prev => [...prev, ...previews]);

        e.target.value = "";

    };

    const removeImage = (index: number) => {

        setImages(prev => {

            const image = prev[index];

            if (image) {

                URL.revokeObjectURL(image.preview);

            }

            return prev.filter((_, i) => i !== index);

        });

    };


   //send_form-------------------------------------
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try
        {

            const formData = new FormData();


            formData.append("Name", name);
            formData.append("Description", description);
            formData.append("Price", price.toString());
            formData.append("CategoryId", categoryId.toString());



            images.forEach(image => {

                formData.append(
                    "Images",
                    image.file
                );

            });



            await productService.create(formData);


            navigate("/admin/products");

        }
        catch(err)
        {
            console.error(err);

            setError(
                "Failed to create product. Please try again."
            );
        }
        finally
        {
            setLoading(false);
        }

    };



   //Body--------------------------------------------
    return (

        <div className="create-product-page">


            <div className="create-product-header">

                <h1 className="create-product-title">
                    Add New Product
                </h1>


                <button
                    className="back-button"
                    type="button"
                    onClick={()=>navigate("/admin/products")}
                >
                    ← Back to Products
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
                        type="text"
                        value={name}
                        onChange={
                            e=>setName(e.target.value)
                        }
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
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={
                            e=>setPrice(
                                Number(e.target.value)
                            )
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
                        Product Images
                    </label>


                    <button type="button"
                        className="add-image-button"
                        onClick={() => fileInputRef.current?.click()}>
                        + Add Image
                    </button>
                    <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageChange}/>
                </div>

                    {
                        images.length > 0 && (

                            <div className="image-preview">

                                {
                                    images.map((image, index) => (

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
                                                onClick={() => removeImage(index)}
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

                        onClick={
                            ()=>navigate("/admin/products")
                        }

                    >
                        Cancel

                    </button>





                    <button

                        type="submit"

                        className="submit-button"

                        disabled={loading}

                    >

                        {
                            loading
                                ? "Creating..."
                                : "Create Product"
                        }

                    </button>


                </div>


            </form>


        </div>

    );
};


export default CreateProductPage;