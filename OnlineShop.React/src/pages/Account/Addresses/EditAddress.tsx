import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    addressApi,
} from "../../../api/addressApi";

import type {
    UpdateAddressRequest,
} from "../../../types/address";

import "./EditAddress.css";


export default function EditAddress() {

    const {
        id,
    } = useParams<{
        id: string;
    }>();

    const navigate =
        useNavigate();


    // Form ----------------------------------------------------

    const [
        form,
        setForm,
    ] = useState<UpdateAddressRequest>({
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
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");


    // Load Address --------------------------------------------

    useEffect(() => {

        let mounted = true;

        async function loadAddress(): Promise<void> {

            if (!id) {

                if (mounted) {

                    setError(
                        "Invalid address ID."
                    );

                    setLoading(false);
                }

                return;
            }

            const addressId =
                Number(id);

            if (
                !Number.isInteger(addressId) ||
                addressId <= 0
            ) {

                if (mounted) {

                    setError(
                        "Invalid address ID."
                    );

                    setLoading(false);
                }

                return;
            }

            try {

                const address =
                    await addressApi.getById(
                        addressId
                    );

                if (!mounted) {
                    return;
                }

                setForm({
                    recipientName:
                    address.recipientName,

                    recipientPhone:
                    address.recipientPhone,

                    addressLine:
                    address.addressLine,

                    city:
                    address.city,

                    state:
                    address.state,

                    postalCode:
                    address.postalCode,

                    isDefault:
                    address.isDefault,
                });

            } catch (err) {

                console.error(err);

                if (mounted) {

                    setError(
                        "Failed to load the address."
                    );
                }

            } finally {

                if (mounted) {
                    setLoading(false);
                }
            }
        }

        void loadAddress();

        return () => {

            mounted = false;
        };

    }, [id]);


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

        setError("");
    };


    // Handle Submit -------------------------------------------

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {

        event.preventDefault();

        if (!id) {

            setError(
                "Invalid address ID."
            );

            return;
        }

        const addressId =
            Number(id);

        if (
            !Number.isInteger(addressId) ||
            addressId <= 0
        ) {

            setError(
                "Invalid address ID."
            );

            return;
        }

        setError("");
        setSaving(true);

        try {

            await addressApi.update(
                addressId,
                {
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
                }
            );

            navigate(
                "/account/addresses",
                {
                    replace: true,
                }
            );

        } catch (err) {

            console.error(err);

            setError(
                "Failed to update the address. Please check your information and try again."
            );

        } finally {

            setSaving(false);
        }
    };


    // Loading -------------------------------------------------

    if (loading) {

        return (
            <section className="edit-address-page">

                <div className="edit-address-loading">

                    <span className="edit-address-loading__spinner" />

                    <span>
                        Loading address...
                    </span>

                </div>

            </section>
        );
    }


    // Error while loading ------------------------------------

    if (error && !form.recipientName) {

        return (
            <section className="edit-address-page">

                <div className="edit-address-error">

                    <div className="edit-address-error__icon">
                        !
                    </div>

                    <h1>
                        Unable to load address
                    </h1>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/account/addresses"
                        className="edit-address-back"
                    >
                        <span>←</span>
                        Back to Addresses
                    </Link>

                </div>

            </section>
        );
    }


    // Render --------------------------------------------------

    return (
        <section className="edit-address-page">

            {/* ==================================================
                Header
            ================================================== */}

            <header className="edit-address-header animate-fade-up">

                <div>

                    <Link
                        to="/account/addresses"
                        className="edit-address-back"
                    >
                        <span>←</span>
                        Back to Addresses
                    </Link>

                    <div className="edit-address-heading">

                        <div className="edit-address-heading__icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"
                                />
                            </svg>

                        </div>

                        <div>

                            <h1>
                                Edit Address
                            </h1>

                            <p>
                                Update your shipping information.
                            </p>

                        </div>

                    </div>

                </div>

            </header>


            {/* ==================================================
                Error
            ================================================== */}

            {error && (
                <div
                    className="edit-address-message"
                    role="alert"
                >

                    <span className="edit-address-message__icon">
                        !
                    </span>

                    <span>
                        {error}
                    </span>

                </div>
            )}


            {/* ==================================================
                Form Card
            ================================================== */}

            <div className="edit-address-card animate-fade-up">

                <div className="edit-address-card__header">

                    <div>

                        <span className="edit-address-card__eyebrow">
                            SHIPPING DETAILS
                        </span>

                        <h2>
                            Address Information
                        </h2>

                        <p>
                            Make sure your delivery information is accurate.
                        </p>

                    </div>

                </div>


                <form
                    className="edit-address-form"
                    onSubmit={handleSubmit}
                >

                    {/* ==================================================
                        Recipient
                    ================================================== */}

                    <div className="edit-address-form__section">

                        <div className="edit-address-form__section-header">

                            <span className="edit-address-form__number">
                                01
                            </span>

                            <div>

                                <h3>
                                    Recipient
                                </h3>

                                <p>
                                    Who should receive this order?
                                </p>

                            </div>

                        </div>


                        <div className="edit-address-form__grid">

                            <div className="edit-address-field">

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
                                    placeholder="Enter recipient name"
                                    required
                                />

                            </div>


                            <div className="edit-address-field">

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
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        Address
                    ================================================== */}

                    <div className="edit-address-form__section">

                        <div className="edit-address-form__section-header">

                            <span className="edit-address-form__number">
                                02
                            </span>

                            <div>

                                <h3>
                                    Delivery Address
                                </h3>

                                <p>
                                    Where should we deliver your order?
                                </p>

                            </div>

                        </div>


                        <div className="edit-address-field">

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
                                placeholder="Enter your full address"
                                required
                            />

                        </div>


                        <div className="edit-address-form__grid">

                            <div className="edit-address-field">

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
                                    placeholder="Enter city"
                                    required
                                />

                            </div>


                            <div className="edit-address-field">

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
                                    placeholder="Enter state"
                                    required
                                />

                            </div>


                            <div className="edit-address-field">

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
                                    placeholder="Enter postal code"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        Default Address
                    ================================================== */}

                    <div className="edit-address-default">

                        <label
                            className="edit-address-default__label"
                        >

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

                            <span className="edit-address-default__checkbox">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="m5 12 4 4L19 6"
                                    />
                                </svg>
                            </span>

                            <span className="edit-address-default__content">

                                <strong>
                                    Set as default address
                                </strong>

                                <small>
                                    Use this address automatically during checkout.
                                </small>

                            </span>

                        </label>

                    </div>


                    {/* ==================================================
                        Actions
                    ================================================== */}

                    <div className="edit-address-actions">

                        <Link
                            to="/account/addresses"
                            className="edit-address-cancel"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="edit-address-save"
                            disabled={saving}
                        >

                            {saving ? (
                                <>
                                    <span className="edit-address-save__spinner" />

                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="m5 12 4 4L19 6"
                                        />
                                    </svg>

                                    Save Changes
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}