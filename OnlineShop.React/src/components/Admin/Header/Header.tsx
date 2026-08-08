import "./Header.css"
const Header = () => {
    return (

        <header className="admin-header">
            <div className="admin-header-container">

                <div className="Header-header-left">
                    <div className="Admin-header-logo">
                        <span className="admin-header-logo-icon">M</span>
                        <div className="admin-header-logo-text">
                          <span className="admin-header-title">Micro Shop</span>
                          <span className="admin-header-subtitle">Admin Panel</span>
                       </div>
                   </div>
                </div>


            <div className="admin-header-right">

                <button className="admin-header-action-btn" title="Notifications">
                    <span className="admin-header-action-icon">🔔</span>
                    <span className="admin-header-action-badge">3</span>
                </button>

                <button className="admin-header-profile-btn">
                    <div className="admin-header-avatar">A</div>
                    <div className="admin-header-profile-info">
                        <span className="admin-header-profile-name">Admin</span>
                        <span className="admin-header-profile-role">Administrator</span>
                    </div>
                </button>
             </div>
            </div>
        </header>
    );
};
export default Header;