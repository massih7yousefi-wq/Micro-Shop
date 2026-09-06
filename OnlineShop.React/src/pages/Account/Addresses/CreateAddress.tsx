import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    addressApi,
} from "../../../api/addressApi";

import type {
    CreateAddressRequest,
} from "../../../types/address";


export default function CreateAddress() {

    const navigate =
        useNavigate();


    // Form ----------------------------------------------------

    const [
        form,
        setForm,
    ] = useState<CreateAddressRequest>({
        recipientName: "",
        recipientPhone: "",
        addressLine: "",
        city: "",
        state: "",
        postalCode: "",
        isDefault: false,
    });


    // State ---------------------------------------------------

    const [
        error,
        setError,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(false);


    // Handle Change -------------------------------------------

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        const target =
            event.target;

        const {
            name,
            value,
        } = target;

        setForm(
            previous => ({
                ...previous,
                [name]:
                    target instanceof HTMLInputElement &&
                    target.type === "checkbox"
                        ? target.checked
                        : value,
            })
        );
    };


    // Handle Submit -------------------------------------------

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            await addressApi.create({
                ...form,
                recipientName:
                    form.recipientName.trim(),
                recipientPhone:
                    form.recipientPhone.trim(),
                addressLine:
                    form.addressLine.trim(),
                city:
                    form.city.trim(),
                state:
                    form.state.trim(),
                postalCode:
                    form.postalCode.trim(),
            });

            navigate(
                "/account/addresses",
                {
                    replace: true,
                }
            );

        } catch (err) {

            console.error(err);

            setError(
                "Failed to create the address. Please check your information and try again."
            );

        } finally {

            setLoading(false);
        }
    };


    // Render --------------------------------------------------

    return (
        <section>

            <header>

                <h1>
                    Add New Address
                </h1>

                <Link
                    to="/account/addresses"
                >
                    Back to Addresses
                </Link>

            </header>


            {/* Error ------------------------------------------ */}

            {error && (
                <div
                    role="alert"
                >
                    {error}
                </div>
            )}


            {/* Form ------------------------------------------- */}

            <form
                onSubmit={handleSubmit}
            >

                {/* Recipient Name ----------------------------- */}

                <div>

                    <label htmlFor="recipientName">
                        Recipient Name
                    </label>

                    <input
                        id="recipientName"
                        name="recipientName"
                        type="text"
                        value={
                            form.recipientName
                        }
                        onChange={
                            handleChange
                        }
                        maxLength={100}
                        autoComplete="name"
                        required
                    />

                </div>


                {/* Recipient Phone ---------------------------- */}

                <div>

                    <label htmlFor="recipientPhone">
                        Recipient Phone
                    </label>

                    <input
                        id="recipientPhone"
                        name="recipientPhone"
                        type="tel"
                        value={
                            form.recipientPhone
                        }
                        onChange={
                            handleChange
                        }
                        maxLength={30}
                        autoComplete="tel"
                        required
                    />

                </div>


                {/* Address Line ------------------------------- */}

                <div>

                    <label htmlFor="addressLine">
                        Address
                    </label>

                    <textarea
                        id="addressLine"
                        name="addressLine"
                        value={
                            form.addressLine
                        }
                        onChange={
                            handleChange
                        }
                        maxLength={500}
                        autoComplete="street-address"
                        required
                    />

                </div>


                {/* City ---------------------------------------- */}

                <div>

                    <label htmlFor="city">
                        City
                    </label>

                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={
                            form.city
                        }
                        onChange={
                            handleChange
                        }
                        maxLength={100}
                        autoComplete="address-level2"
                        required
                    />

                </div>


                {/* State --------------------------------------- */}

                <div>

                    <label htmlFor="state">
                        State
                    </label>

                    <input
                        id="state"
                        name="state"
                        type="text"
                        value={
                            form.state
                        }
                        onChange={
                            handleChange
                        }
                        maxLength={100}
                        autoComplete="address-level1"
                        required
                    />

                </div>


                {/* Postal Code --------------------------------- */}

                <div>

                    <label htmlFor="postalCode">
                        Postal Code
                    </label>

                    <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={
                            form.postalCode
                        }
                        onChange={
                            handleChange
                        }
                        maxLength={30}
                        autoComplete="postal-code"
                        required
                    />

                </div>


                {/* Default Address ---------------------------- */}

                <div>

                    <label>

                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={
                                form.isDefault
                            }
                            onChange={
                                handleChange
                            }
                        />

                        Set as default address

                    </label>

                </div>


                {/* Actions ------------------------------------ */}

                <div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Creating..."
                                : "Create Address"
                        }
                    </button>

                    <Link
                        to="/account/addresses"
                    >
                        Cancel
                    </Link>

                </div>

            </form>

        </section>
    );
}


