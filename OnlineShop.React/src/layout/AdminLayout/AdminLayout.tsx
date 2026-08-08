//imports------------------------------------
import { Outlet } from "react-router-dom";
import Header from "../../components/Admin/Header/Header"
import Footer from "../../components/Admin/Footer/Footer"
import Sidebar from "../../components/Admin/Sidebar/Sidebar"
import "./AdminLayout.css"
//Page--------------------------------------------
const AdminLayout = () => {
    return (
        <>
            <div className="admin-layout">
            <Header />
         <div className="Admin-body">
            <Sidebar />
            <main className="admin-Content">
                <Outlet/>
                </main>
            </div>
            <Footer />
            </div>
        </>
    );
}
export default AdminLayout;