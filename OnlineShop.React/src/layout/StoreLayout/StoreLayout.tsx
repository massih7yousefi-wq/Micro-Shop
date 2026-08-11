import { Outlet } from "react-router-dom";
import Header from "../../components/Home/Header/Header";
import Footer from "../../components/Home/Footer/Footer";

const StoreLayout = () => {
    return (
        <div className="store-layout">

            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

export default StoreLayout;