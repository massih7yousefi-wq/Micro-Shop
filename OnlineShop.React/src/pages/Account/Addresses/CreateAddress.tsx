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

import "../../../styles/account/AddressForm.css";


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
        <section className="address-page">

            <div className="address-background">

                <div className="address-glow address-glow--one" />

                <div className="address-glow address-glow--two" />

                <div className="address-grid" />

            </div>


            <div className="address-container">

                <div className="address-card animate-scale-in">

                    {/* Header ---------------------------------- */}

                    <header className="address-header">

                        <div className="address-header__main">

                            <div className="address-icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
                                    />

                                    <circle
                                        cx="12"
                                        cy="10"
                                        r="2.5"
                                    />
                                </svg>

                            </div>


                            <div>

                                <p className="address-eyebrow">
                                    ACCOUNT
                                </p>

                                <h1>
                                    Add New Address
                                </h1>

                                <p className="address-subtitle">
                                    Save an address for a faster checkout.
                                </p>

                            </div>

                        </div>


                        <Link
                            className="address-back-link"
                            to="/account/addresses"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M19 12H5"
                                />

                                <path
                                    d="m12 19-7-7 7-7"
                                />
                            </svg>

                            <span>
                                Back to Addresses
                            </span>

                        </Link>

                    </header>


                    <div className="address-divider" />


                    {/* Error ---------------------------------- */}

                    {error && (
                        <div
                            className="address-error"
                            role="alert"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                />

                                <path
                                    d="M12 8v4"
                                />

                                <path
                                    d="M12 16h.01"
                                />
                            </svg>

                            <span>
                                {error}
                            </span>

                        </div>
                    )}


                    {/* Form ----------------------------------- */}

                    <form
                        className="address-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Recipient -------------------------- */}

                        <section className="address-form__section">

                            <div className="address-form__section-header">

                                <span className="address-form__section-number">
                                    01
                                </span>

                                <div>

                                    <h2>
                                        Recipient Information
                                    </h2>

                                    <p>
                                        Tell us who will receive this order.
                                    </p>

                                </div>

                            </div>


                            <div className="address-form__grid">

                                <div className="address-field">

                                    <label htmlFor="recipientName">
                                        Recipient Name
                                    </label>

                                    <div className="address-input-wrapper">

                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="3"
                                            />

                                            <path
                                                d="M5 20c.8-3.3 3.1-5 7-5s6.2 1.7 7 5"
                                            />
                                        </svg>

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
                                            placeholder="John Doe"
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="address-field">

                                    <label htmlFor="recipientPhone">
                                        Recipient Phone
                                    </label>

                                    <div className="address-input-wrapper">

                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="7"
                                                y="3"
                                                width="10"
                                                height="18"
                                                rx="2"
                                            />

                                            <path
                                                d="M10 6h4"
                                            />

                                            <path
                                                d="M11 18h2"
                                            />
                                        </svg>

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
                                            placeholder="+1 555 000 0000"
                                            required
                                        />

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* Address ----------------------------- */}

                        <section className="address-form__section">

                            <div className="address-form__section-header">

                                <span className="address-form__section-number">
                                    02
                                </span>

                                <div>

                                    <h2>
                                        Delivery Address
                                    </h2>

                                    <p>
                                        Where should we deliver your order?
                                    </p>

                                </div>

                            </div>


                            <div className="address-form__grid">

                                <div className="address-field address-field--full">

                                    <label htmlFor="addressLine">
                                        Address
                                    </label>

                                    <div className="address-input-wrapper address-input-wrapper--textarea">

                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M4 10.5 12 4l8 6.5"
                                            />

                                            <path
                                                d="M6.5 9.5V20h11V9.5"
                                            />

                                            <path
                                                d="M10 20v-5h4v5"
                                            />
                                        </svg>

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
                                            placeholder="Street address, apartment, suite, etc."
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="address-field">

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
                                        placeholder="New York"
                                        required
                                    />

                                </div>


                                <div className="address-field">

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
                                        placeholder="New York"
                                        required
                                    />

                                </div>


                                <div className="address-field">

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
                                        placeholder="10001"
                                        required
                                    />

                                </div>

                            </div>

                        </section>


                        {/* Default ----------------------------- */}

                        <section className="address-default">

                            <label className="address-checkbox">

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

                                <span className="address-checkbox__box">

                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="m5 12 4 4L19 6"
                                        />
                                    </svg>

                                </span>


                                <span className="address-checkbox__content">

                                    <strong>
                                        Set as default address
                                    </strong>

                                    <small>
                                        Use this address automatically during checkout.
                                    </small>

                                </span>

                            </label>

                        </section>


                        {/* Actions -------------------------------- */}

                        <div className="address-actions">

                            <Link
                                className="address-button address-button--secondary"
                                to="/account/addresses"
                            >
                                Cancel
                            </Link>


                            <button
                                className="address-button address-button--primary"
                                type="submit"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="address-spinner" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M12 5v14"
                                            />

                                            <path
                                                d="m5 12 7 7 7-7"
                                            />
                                        </svg>

                                        Create Address
                                    </>
                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </section>
    );
}