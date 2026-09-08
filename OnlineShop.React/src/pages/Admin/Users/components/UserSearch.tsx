import type {
    ChangeEvent,
} from "react";

interface UserSearchProps {
    value: string;

    onChange: (
        value: string
    ) => void;
}


export default function UserSearch({
                                       value,
                                       onChange,
                                   }: UserSearchProps) {

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        onChange(
            event.target.value
        );
    };


    return (
        <div className="admin-user-search">

            <svg
                className="admin-user-search__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle
                    cx="11"
                    cy="11"
                    r="7"
                />

                <path
                    d="m20 20-4-4"
                />
            </svg>


            <input
                type="search"
                value={value}
                onChange={handleChange}
                placeholder="Search by username or email..."
                aria-label="Search users"
            />


            {value && (
                <button
                    type="button"
                    className="admin-user-search__clear"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}

        </div>
    );
}