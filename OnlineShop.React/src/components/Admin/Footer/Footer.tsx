import "./Footer.css"
//Page--------------------------
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
          <footer className="admin-footer">
              <div className="admin-footer-container">
                  <div className="admin-footer-left">
                      <p className="admin-footer-copyright">
                          © {currentYear} <span>Micro Shop</span>. All rights reserved.
                      </p>
                  </div>

                 <div className="admin-footer-right">
                     <a href="#" className="admin-footer-link">
                         Privacy Policy
                     </a>
                     <span className="admin-footer-separator">•</span>
                     <a href="#" className="admin-footer-link">
                         Term of Services
                     </a>
                     <a href="#" className="admin-footer-link">
                         Support
                     </a>
                 </div>
              </div>
          </footer>
    );
};
export default Footer;
