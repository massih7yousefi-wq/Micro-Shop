import { useEffect, useState } from "react";
import { categoryService } from "../../../services/categoryService";
import type { Category } from "../../../models/Category/Category";
import "./CategorySelect.css"
interface CategorySelectProps {
    value: number;
    onChange: (id: number) => void;
}

const CategorySelect = ({
                            value,
                            onChange,
                        }: CategorySelectProps) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const timer = setTimeout(async () => {

            try {

                setLoading(true);

                const result =
                    await categoryService.getCategories(
                        search,
                        "Name",
                        true,
                        1,
                        50
                    );

                setCategories(result.categories);

            }
            catch(err){

                console.error(err);

            }
            finally {

                setLoading(false);

            }

        },300);


        return () => clearTimeout(timer);


    },[search]);



    const selectedCategory =
        categories.find(c => c.id === value);



    return (

        <div className="category-select">


            <input
                type="text"
                placeholder="Search category..."
                value={
                    open
                        ? search
                        : selectedCategory?.name ?? ""
                }
                onFocus={() => setOpen(true)}
                onChange={e => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
            />


            {
                open && (

                    <div className="category-dropdown">


                        {
                            loading &&
                            <p>
                                Loading...
                            </p>
                        }


                        {
                            categories.map(category => (

                                <div
                                    key={category.id}
                                    className="category-option"
                                    onClick={() => {

                                        onChange(category.id);

                                        setOpen(false);

                                        setSearch("");

                                    }}
                                >

                                    {category.name}

                                </div>

                            ))
                        }


                    </div>

                )
            }


        </div>

    );
};


export default CategorySelect;