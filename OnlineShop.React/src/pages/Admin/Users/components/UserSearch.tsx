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
        <div>

            <input
                type="search"
                value={value}
                onChange={handleChange}
                placeholder="Search users..."
                aria-label="Search users"
            />

        </div>
    );
}
