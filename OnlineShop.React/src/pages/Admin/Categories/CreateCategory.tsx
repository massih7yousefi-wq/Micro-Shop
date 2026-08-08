//imports--------------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../../services/categoryService";
import "./CreateCategory.css";
//component-----------------------------------------------
const CreateCategory = () => {
     //state---------------------------------------
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    //handle_submit-----------------------------------------------------
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {

            await categoryService.create({
                name
            });

            navigate("/admin/categories");

        }
        catch(err){

            console.error(err);

            setError(
                "Failed to create category."
            );

        }
        finally{

            setLoading(false);

        }

    };


//Body--------------------------------------------
    return (

        <div className="category-page">

            <div className="category-header">

                <h1 className="category-title">
                    Add Category
                </h1>

                <p className="category-subtitle">
                    Create a new product category
                </p>

                <button
                    className="category-back-button"
                    type="button"
                    onClick={() => navigate("/admin/categories")}
                >
                    ← Back
                </button>

            </div>



            <form
                className="category-form"
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
                        Category Name
                    </label>


                    <input
                        type="text"
                        value={name}
                        onChange={
                            e => setName(e.target.value)
                        }
                        required
                    />

                </div>



                <div className="form-actions">

                    <button
                        className="category-cancel-button"
                        type="button"
                        onClick={() =>
                            navigate("/admin/categories")
                        }
                    >
                        Cancel
                    </button>


                    <button
                        className="category-submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Creating..."
                                : "Create Category"
                        }
                    </button>

                </div>


            </form>

        </div>

    );

};


export default CreateCategory;