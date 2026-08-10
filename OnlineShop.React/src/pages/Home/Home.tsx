//Imports-----------------------
import "./Home.css";
import Header from "../../components/Home/Header/Header";
import Footer from "../../components/Home/Footer/Footer";
import Hero from "../../components/Home/Hero/Hero";
import Categories from "../../components/Home/Categories/Categories";
import FeaturedProducts from "../../components/Home/FeaturedProducts/FeaturedProducts";
//component----------------------------
const Home = () => {
    return (
        <div className="home-page">
            <Header />

            <main>
                <Hero />
                <Categories />

                <FeaturedProducts />

                <Footer />

            </main>
        </div>
    );
};
export default Home;