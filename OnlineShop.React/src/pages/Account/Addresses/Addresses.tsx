import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    addressApi,
} from "../../../api/addressApi";

import type {
    AddressResponse,
} from "../../../types/address";


export default function Addresses() {

    // State ---------------------------------------------------

    const [
        addresses,
        setAddresses,
    ] = useState<AddressResponse[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        actionLoadingId,
        setActionLoadingId,
    ] = useState<number | null>(null);


    // Load Addresses ------------------------------------------

    const loadAddresses =
        useCallback(
            async (): Promise<void> => {

                setError("");

                try {

                    const data =
                        await addressApi.getAll();

                    setAddresses(data);

                } catch (err) {

                    console.error(err);

                    setError(
                        "Failed to load your addresses."
                    );

                } finally {

                    setLoading(false);
                }
            },
            []
        );


    // Initial Load --------------------------------------------

    useEffect(() => {

        void loadAddresses();

    }, [loadAddresses]);


    // Delete Address ------------------------------------------

    const handleDelete = async (
        id: number
    ): Promise<void> => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this address?"
            );

        if (!confirmed) {
            return;
        }

        setError("");
        setActionLoadingId(id);

        try {

            await addressApi.delete(id);

            setAddresses(
                previous =>
                    previous.filter(
                        address =>
                            address.id !== id
                    )
            );

        } catch (err) {

            console.error(err);

            setError(
                "Failed to delete the address."
            );

        } finally {

            setActionLoadingId(null);
        }
    };


    // Set Default Address ------------------------------------

    const handleSetDefault = async (
        id: number
    ): Promise<void> => {

        setError("");
        setActionLoadingId(id);

        try {

            await addressApi.setDefault(id);

            setAddresses(
                previous =>
                    previous.map(
                        address => ({
                            ...address,
                            isDefault:
                                address.id === id,
                        })
                    )
            );

        } catch (err) {

            console.error(err);

            setError(
                "Failed to update the default address."
            );

        } finally {

            setActionLoadingId(null);
        }
    };


    // Loading -------------------------------------------------

    if (loading) {

        return (
            <section>
                <h1>My Addresses</h1>

                <div>
                    Loading addresses...
                </div>
            </section>
        );
    }


    // Render --------------------------------------------------

    return (
        <section>

            <header>

                <h1>
                    My Addresses
                </h1>

                <Link
                    to="/account/addresses/create"
                >
                    Add New Address
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


            {/* Empty State ------------------------------------ */}

            {addresses.length === 0 && !error && (

                <div>

                    <p>
                        You don't have any saved addresses yet.
                    </p>

                    <Link
                        to="/account/addresses/create"
                    >
                        Add Your First Address
                    </Link>

                </div>
            )}


            {/* Address List ----------------------------------- */}

            {addresses.length > 0 && (

                <div>

                    {addresses.map(
                        address => {

                            const isActionLoading =
                                actionLoadingId ===
                                address.id;

                            return (
                                <article
                                    key={address.id}
                                >

                                    <h2>
                                        {address.recipientName}
                                    </h2>


                                    {address.isDefault && (
                                        <span>
                                            Default
                                        </span>
                                    )}


                                    <p>
                                        {
                                            address.recipientPhone
                                        }
                                    </p>

                                    <p>
                                        {
                                            address.addressLine
                                        }
                                    </p>

                                    <p>
                                        {
                                            address.city
                                        },
                                        {" "}
                                        {
                                            address.state
                                        }
                                    </p>

                                    <p>
                                        {
                                            address.postalCode
                                        }
                                    </p>


                                    {/* Actions ---------------- */}

                                    <div>

                                        <Link
                                            to={
                                                `/account/addresses/edit/${address.id}`
                                            }
                                        >
                                            Edit
                                        </Link>


                                        {!address.isDefault && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    void handleSetDefault(
                                                        address.id
                                                    )
                                                }
                                                disabled={
                                                    isActionLoading
                                                }
                                            >
                                                {
                                                    isActionLoading
                                                        ? "Updating..."
                                                        : "Set Default"
                                                }
                                            </button>
                                        )}


                                        <button
                                            type="button"
                                            onClick={() =>
                                                void handleDelete(
                                                    address.id
                                                )
                                            }
                                            disabled={
                                                isActionLoading
                                            }
                                        >
                                            {
                                                isActionLoading
                                                    ? "Processing..."
                                                    : "Delete"
                                            }
                                        </button>

                                    </div>

                                </article>
                            );
                        }
                    )}

                </div>
            )}

        </section>
    );
}

