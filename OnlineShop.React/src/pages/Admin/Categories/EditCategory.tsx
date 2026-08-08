//imports--------------------------------------
import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { categoryService } from "../../../services/categoryService";
import "./CreateCategory.css";

//component------------------------------------------
const EditCategory = () => {
    //state-------------------------------------
    const { id } = useParams<{id:string}>();
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(true);
    const [saving,setSaving] = useState(false);
    const [error,setError] = useState("");

    //UseEffect-------------------------------------
    useEffect(()=>{

        const load = async()=>{

            if(!id)
                return;


            try{

                const category =
                    await categoryService.getById(
                        Number(id)
                    );


                setName(category.name);

            }
            catch{

                setError(
                    "Failed to load category."
                );

            }
            finally{

                setLoading(false);

            }

        };


        void load();

    },[id]);




    //handle_submit------------------------------------------------
    const handleSubmit = async(
        e:React.FormEvent<HTMLFormElement>
    )=>{

        e.preventDefault();


        if(!id)
            return;


        setSaving(true);
        setError("");

        try{

            await categoryService.update(
                Number(id),
                {
                    name
                }
            );


            navigate("/admin/categories");

        }
        catch{

            setError(
                "Failed to update category."
            );

        }
        finally{

            setSaving(false);

        }

    };



    if(loading)
    {
        return <h2>Loading...</h2>;
    }


    //Body-----------------------------------------------------------
    return (

        <div className="category-page">


            <div className="category-header">

                <h1 className="category-title">
                    Edit Category
                </h1>

                <p className="category-subtitle">
                    Update category information
                </p>


                <button
                    className="category-back-button"
                    type="button"
                    onClick={() =>
                        navigate("/admin/categories")
                    }
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
                            e=>setName(e.target.value)
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


export default EditCategory;