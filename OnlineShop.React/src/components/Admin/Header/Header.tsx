import "./Header.css";

const Header = () => {
    return (
        <header className="admin-header">
            <div className="admin-header-container">

                {/* Brand */}
                <div className="admin-header-left">

                    <div className="admin-header-logo">

                        <div className="admin-logo-mark">
                            <span className="admin-logo-line admin-logo-line--left" />
                            <span className="admin-logo-line admin-logo-line--center" />
                            <span className="admin-logo-line admin-logo-line--right" />
                        </div>

                        <div className="admin-header-logo-text">
                            <span className="admin-header-title">
                                Micro Shop
                            </span>

                            <span className="admin-header-subtitle">
                                Admin Panel
                            </span>
                        </div>

                    </div>

                </div>

                {/* Right */}
                <div className="admin-header-right">

                    {/* Notifications */}
                    <button
                        className="admin-header-action-btn"
                        type="button"
                        aria-label="Notifications"
                    >
                        <span className="admin-header-action-icon">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>

                        <span className="admin-header-action-badge">
                            3
                        </span>
                    </button>

                    {/* Profile */}
                    <button
                        className="admin-header-profile-btn"
                        type="button"
                    >
                        <div className="admin-header-avatar">
                            A
                        </div>

                        <div className="admin-header-profile-info">
                            <span className="admin-header-profile-name">
                                Admin
                            </span>

                            <span className="admin-header-profile-role">
                                Administrator
                            </span>
                        </div>

                        <span className="admin-header-profile-arrow">
                            ↓
                        </span>
                    </button>

                </div>

            </div>
        </header>
    );
};

export default Header;
