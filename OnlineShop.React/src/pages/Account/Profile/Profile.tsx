import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Link,
} from "react-router-dom";

import AuthLayout
    from "../../../components/Auth/AuthLayout";

import AuthInput
    from "../../../components/Auth/AuthInput";

import AuthButton
    from "../../../components/Auth/AuthButton";

import { profileApi }
    from "../../../api/profileApi";

import type {
    UpdateProfileRequest,
    UserProfile,
} from "../../../types/profile";

import "./Profile.css";


export default function Profile() {

    // Profile State--------------------------------------------

    const [
        profile,
        setProfile,
    ] = useState<UserProfile | null>(null);


    // Form-----------------------------------------------------

    const [
        form,
        setForm,
    ] = useState<UpdateProfileRequest>({
        firstName: "",
        lastName: "",
        phoneNumber: null,
    });


    // State----------------------------------------------------

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

    const [
        success,
        setSuccess,
    ] = useState("");


    // Load Profile---------------------------------------------

    useEffect(() => {

        let mounted = true;

        async function loadProfile() {

            try {

                const data =
                    await profileApi.getProfile();

                if (!mounted) {
                    return;
                }

                setProfile(data);

                setForm({
                    firstName:
                    data.firstName,
                    lastName:
                    data.lastName,
                    phoneNumber:
                    data.phoneNumber,
                });

            } catch (err) {

                console.error(err);

                if (mounted) {

                    setError(
                        "Failed to load your profile. Please try again."
                    );
                }

            } finally {

                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadProfile();

        return () => {
            mounted = false;
        };

    }, []);


    // Handle Change--------------------------------------------

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        const {
            name,
            value,
        } = event.target;

        setForm(
            previous => ({
                ...previous,
                [name]:
                    name === "phoneNumber"
                        ? value || null
                        : value,
            })
        );

        setSuccess("");
        setError("");
    };


    // Handle Submit--------------------------------------------

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);

        try {

            const updatedProfile =
                await profileApi.updateProfile(
                    form
                );

            setProfile(
                updatedProfile
            );

            setForm({
                firstName:
                updatedProfile.firstName,
                lastName:
                updatedProfile.lastName,
                phoneNumber:
                updatedProfile.phoneNumber,
            });

            setSuccess(
                "Your profile has been updated successfully."
            );

        } catch (err) {

            console.error(err);

            setError(
                "Failed to update your profile. Please check your information and try again."
            );

        } finally {

            setSaving(false);
        }
    };


    // Loading--------------------------------------------------

    if (loading) {

        return (
            <AuthLayout
                title="Manage Account"
                subtitle="Manage your account and personal information"
            >

                <div className="profile-status">

                    <div className="profile-loader">

                        <span className="profile-loader__spinner" />

                        <span>
                            Loading your profile...
                        </span>

                    </div>

                </div>

            </AuthLayout>
        );
    }


    // Error without Profile-----------------------------------

    if (!profile) {

        return (
            <AuthLayout
                title="Manage Account"
                subtitle="Manage your account and personal information"
            >

                <div className="profile-status">

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                </div>

            </AuthLayout>
        );
    }


    // Render---------------------------------------------------

    return (
        <AuthLayout
            title="Manage Account"
            subtitle="Manage your account and personal information"
        >

            <div className="profile-page">


                {/* ==================================================
                    Account Navigation
                ================================================== */}

                <nav
                    className="account-navigation animate-fade-up"
                    aria-label="Account navigation"
                >

                    {/* Profile ------------------------------------- */}

                    <Link
                        to="/account/profile"
                        className="account-navigation__item account-navigation__item--active"
                    >

                        <span className="account-navigation__icon">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M20 21a8 8 0 0 0-16 0"
                                />
                                <circle
                                    cx="12"
                                    cy="7"
                                    r="4"
                                />
                            </svg>
                        </span>

                        <span className="account-navigation__content">

                            <span className="account-navigation__title">
                                Profile
                            </span>

                            <span className="account-navigation__description">
                                Manage your personal information
                            </span>

                        </span>

                        <span className="account-navigation__arrow">
                            →
                        </span>

                    </Link>


                    {/* Change Password ---------------------------- */}

                    <Link
                        to="/account/change-password"
                        className="account-navigation__item"
                    >

                        <span className="account-navigation__icon">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="4"
                                    y="10"
                                    width="16"
                                    height="10"
                                    rx="2"
                                />
                                <path
                                    d="M8 10V7a4 4 0 0 1 8 0v3"
                                />
                                <circle
                                    cx="12"
                                    cy="15"
                                    r="1"
                                />
                            </svg>
                        </span>

                        <span className="account-navigation__content">

                            <span className="account-navigation__title">
                                Password & Security
                            </span>

                            <span className="account-navigation__description">
                                Change your account password
                            </span>

                        </span>

                        <span className="account-navigation__arrow">
                            →
                        </span>

                    </Link>


                    {/* Addresses ---------------------------------- */}

                    <Link
                        to="/account/addresses"
                        className="account-navigation__item"
                    >

                        <span className="account-navigation__icon">
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
                        </span>

                        <span className="account-navigation__content">

                            <span className="account-navigation__title">
                                Addresses
                            </span>

                            <span className="account-navigation__description">
                                Manage your shipping addresses
                            </span>

                        </span>

                        <span className="account-navigation__arrow">
                            →
                        </span>

                    </Link>

                </nav>


                {/* ==================================================
                    Profile Information
                ================================================== */}

                <section
                    className="account-section animate-fade-up"
                >

                    <div className="account-section__header">

                        <div className="account-section__heading">

                            <div className="account-section__icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M20 21a8 8 0 0 0-16 0"
                                    />
                                    <circle
                                        cx="12"
                                        cy="7"
                                        r="4"
                                    />
                                </svg>
                            </div>

                            <div>

                                <h2 className="account-section__title">
                                    Profile Information
                                </h2>

                                <p className="account-section__description">
                                    Update your personal information below.
                                </p>

                            </div>

                        </div>

                    </div>


                    <form
                        className="auth-form profile-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Error ----------------------------------- */}

                        {error && (
                            <div className="auth-error profile-message">
                                <span className="profile-message__icon">
                                    !
                                </span>

                                <span>
                                    {error}
                                </span>
                            </div>
                        )}


                        {/* Success --------------------------------- */}

                        {success && (
                            <div className="auth-success profile-message">
                                <span className="profile-message__icon">
                                    ✓
                                </span>

                                <span>
                                    {success}
                                </span>
                            </div>
                        )}


                        {/* Account Information --------------------- */}

                        <div className="profile-form__group">

                            <div className="profile-form__group-header">

                                <span className="profile-form__eyebrow">
                                    ACCOUNT
                                </span>

                                <span className="profile-form__hint">
                                    Read-only information
                                </span>

                            </div>


                            <div className="profile-form__grid">

                                <div className="profile-readonly">

                                    <AuthInput
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        label="Username"
                                        value={profile.userName}
                                        readOnly
                                        autoComplete="username"
                                    />

                                    <span className="profile-readonly__badge">
                                        Read only
                                    </span>

                                </div>


                                <div className="profile-readonly">

                                    <AuthInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Email"
                                        value={profile.email}
                                        readOnly
                                        autoComplete="email"
                                    />

                                    <span className="profile-readonly__badge">
                                        Read only
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Personal Information -------------------- */}

                        <div className="profile-form__group">

                            <div className="profile-form__group-header">

                                <span className="profile-form__eyebrow">
                                    PERSONAL INFORMATION
                                </span>

                                <span className="profile-form__hint">
                                    Keep your information up to date
                                </span>

                            </div>


                            <div className="profile-form__grid">

                                <AuthInput
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    maxLength={50}
                                    required
                                />


                                <AuthInput
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    autoComplete="family-name"
                                    maxLength={50}
                                    required
                                />

                            </div>


                            <AuthInput
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                value={form.phoneNumber ?? ""}
                                onChange={handleChange}
                                autoComplete="tel"
                                maxLength={30}
                            />

                        </div>


                        {/* Submit ---------------------------------- */}

                        <div className="profile-form__actions">

                            <AuthButton
                                type="submit"
                                loading={saving}
                            >
                                Save Changes
                            </AuthButton>

                        </div>

                    </form>

                </section>


                {/* ==================================================
                    Account Footer
                ================================================== */}

                <div className="auth-footer profile-footer">

                    <Link
                        to="/"
                        className="auth-link"
                    >
                        <span>←</span>
                        Back to Store
                    </Link>

                </div>

            </div>

        </AuthLayout>
    );
}