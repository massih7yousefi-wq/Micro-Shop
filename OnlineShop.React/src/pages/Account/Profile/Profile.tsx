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
                title="Your Profile"
                subtitle="Manage your personal information"
            >

                <div className="auth-status">

                    <div className="auth-loading">
                        Loading your profile...
                    </div>

                </div>

            </AuthLayout>
        );
    }


    // Error without Profile-----------------------------------

    if (!profile) {

        return (
            <AuthLayout
                title="Your Profile"
                subtitle="Manage your personal information"
            >

                <div className="auth-status">

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
            title="Your Profile"
            subtitle="Manage your personal information"
        >

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                {/* Error --------------------------------------- */}

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                {/* Success ------------------------------------- */}

                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}


                {/* Username ------------------------------------ */}

                <AuthInput
                    id="userName"
                    name="userName"
                    type="text"
                    label="Username"
                    value={profile.userName}
                    readOnly
                    autoComplete="username"
                />


                {/* Email --------------------------------------- */}

                <AuthInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={profile.email}
                    readOnly
                    autoComplete="email"
                />


                {/* First Name ---------------------------------- */}

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


                {/* Last Name ----------------------------------- */}

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


                {/* Phone Number -------------------------------- */}

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


                {/* Submit -------------------------------------- */}

                <AuthButton
                    type="submit"
                    loading={saving}
                >
                    Save Changes
                </AuthButton>

            </form>


            {/* Account Navigation ----------------------------- */}

            <div className="auth-footer">

                <Link
                    to="/"
                    className="auth-link"
                >
                    Back to Store
                </Link>

            </div>

        </AuthLayout>
    );
}

