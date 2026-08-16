// imports ------------------------------------
import { Outlet } from "react-router-dom";

import Header from "../../components/Admin/Header/Header";
import Footer from "../../components/Admin/Footer/Footer";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";

import "./AdminLayout.css";


// Page ---------------------------------------
const AdminLayout = () => {

    return (

        <div className="admin-layout">

            {/* Header */}
            <Header />


            {/* Main Body */}
            <div className="admin-body">

                {/* Sidebar */}
                <Sidebar />


                {/* Content */}
                <main className="admin-content">

                    <div className="admin-content-inner">

                        <Outlet />

                    </div>

                </main>

            </div>


            {/* Footer */}
            <Footer />

        </div>
    );
};


export default AdminLayout;