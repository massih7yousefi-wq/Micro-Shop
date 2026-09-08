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

import "./Addresses.css";


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
            <section className="addresses-page">

                <div className="addresses-loading">

                    <span className="addresses-loading__spinner" />

                    <span>
                        Loading your addresses...
                    </span>

                </div>

            </section>
        );
    }


    // Render --------------------------------------------------

    return (
        <section className="addresses-page">

            {/* ==================================================
                Page Header
            ================================================== */}

            <header className="addresses-header animate-fade-up">

                <div className="addresses-header__content">

                    <div className="addresses-header__icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                            />

                            <circle
                                cx="12"
                                cy="10"
                                r="2.5"
                            />
                        </svg>

                    </div>

                    <div>

                        <h1 className="addresses-header__title">
                            My Addresses
                        </h1>

                        <p className="addresses-header__description">
                            Manage your saved shipping addresses.
                        </p>

                    </div>

                </div>


                <Link
                    to="/account/addresses/create"
                    className="addresses-add-button"
                >

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 5v14"
                        />

                        <path
                            d="M5 12h14"
                        />
                    </svg>

                    <span>
                        Add New Address
                    </span>

                </Link>

            </header>


            {/* ==================================================
                Error
            ================================================== */}

            {error && (
                <div
                    className="addresses-message addresses-message--error animate-fade-up"
                    role="alert"
                >

                    <span className="addresses-message__icon">
                        !
                    </span>

                    <span>
                        {error}
                    </span>

                </div>
            )}


            {/* ==================================================
                Empty State
            ================================================== */}

            {addresses.length === 0 && !error && (

                <div className="addresses-empty animate-scale-in">

                    <div className="addresses-empty__icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                            />

                            <circle
                                cx="12"
                                cy="10"
                                r="2.5"
                            />
                        </svg>

                    </div>

                    <h2>
                        No saved addresses
                    </h2>

                    <p>
                        Add an address to make your checkout
                        faster and easier.
                    </p>

                    <Link
                        to="/account/addresses/create"
                        className="addresses-empty__button"
                    >
                        Add Your First Address
                    </Link>

                </div>
            )}


            {/* ==================================================
                Address List
            ================================================== */}

            {addresses.length > 0 && (

                <div className="addresses-list">

                    {addresses.map(
                        (address, index) => {

                            const isActionLoading =
                                actionLoadingId ===
                                address.id;

                            return (
                                <article
                                    key={address.id}
                                    className="address-card animate-fade-up"
                                    style={{
                                        animationDelay:
                                            `${index * 70}ms`,
                                    }}
                                >

                                    {/* Card Header ---------------- */}

                                    <div className="address-card__header">

                                        <div className="address-card__identity">

                                            <div className="address-card__icon">

                                                <svg
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                                    />

                                                    <circle
                                                        cx="12"
                                                        cy="10"
                                                        r="2.5"
                                                    />
                                                </svg>

                                            </div>

                                            <div>

                                                <h2 className="address-card__name">
                                                    {address.recipientName}
                                                </h2>

                                                <span className="address-card__label">
                                                    Shipping Address
                                                </span>

                                            </div>

                                        </div>


                                        {address.isDefault && (
                                            <span className="address-card__default">

                                                <svg
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="m5 12 4 4L19 6"
                                                    />
                                                </svg>

                                                Default

                                            </span>
                                        )}

                                    </div>


                                    {/* Card Body ------------------ */}

                                    <div className="address-card__body">

                                        <div className="address-card__row">

                                            <span className="address-card__row-icon">

                                                <svg
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M6 4h12v16H6z"
                                                    />

                                                    <path
                                                        d="M9 8h6"
                                                    />

                                                    <path
                                                        d="M9 12h6"
                                                    />
                                                </svg>

                                            </span>

                                            <span>
                                                {address.addressLine}
                                            </span>

                                        </div>


                                        <div className="address-card__details">

                                            <div className="address-card__detail">

                                                <span className="address-card__detail-label">
                                                    City
                                                </span>

                                                <span className="address-card__detail-value">
                                                    {address.city}
                                                </span>

                                            </div>


                                            <div className="address-card__detail">

                                                <span className="address-card__detail-label">
                                                    State
                                                </span>

                                                <span className="address-card__detail-value">
                                                    {address.state}
                                                </span>

                                            </div>


                                            <div className="address-card__detail">

                                                <span className="address-card__detail-label">
                                                    Postal Code
                                                </span>

                                                <span className="address-card__detail-value">
                                                    {address.postalCode}
                                                </span>

                                            </div>


                                            <div className="address-card__detail">

                                                <span className="address-card__detail-label">
                                                    Phone
                                                </span>

                                                <span className="address-card__detail-value">
                                                    {address.recipientPhone}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Card Actions -------------- */}

                                    <div className="address-card__actions">

                                        <Link
                                            to={
                                                `/account/addresses/edit/${address.id}`
                                            }
                                            className="address-action address-action--edit"
                                        >

                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M12 20h9"
                                                />

                                                <path
                                                    d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"
                                                />
                                            </svg>

                                            Edit

                                        </Link>


                                        {!address.isDefault && (
                                            <button
                                                type="button"
                                                className="address-action address-action--default"
                                                onClick={() =>
                                                    void handleSetDefault(
                                                        address.id
                                                    )
                                                }
                                                disabled={
                                                    isActionLoading
                                                }
                                            >

                                                {isActionLoading ? (
                                                    <span className="address-button-spinner" />
                                                ) : (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"
                                                        />
                                                    </svg>
                                                )}

                                                {isActionLoading
                                                    ? "Updating..."
                                                    : "Set Default"}

                                            </button>
                                        )}


                                        <button
                                            type="button"
                                            className="address-action address-action--delete"
                                            onClick={() =>
                                                void handleDelete(
                                                    address.id
                                                )
                                            }
                                            disabled={
                                                isActionLoading
                                            }
                                        >

                                            {isActionLoading ? (
                                                <span className="address-button-spinner" />
                                            ) : (
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M4 7h16"
                                                    />

                                                    <path
                                                        d="M10 11v6"
                                                    />

                                                    <path
                                                        d="M14 11v6"
                                                    />

                                                    <path
                                                        d="M6 7l1 13h10l1-13"
                                                    />

                                                    <path
                                                        d="M9 7V4h6v3"
                                                    />
                                                </svg>
                                            )}

                                            {isActionLoading
                                                ? "Processing..."
                                                : "Delete"}

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