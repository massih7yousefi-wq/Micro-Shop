//Imports-----------------------
import "./Home.css";
import Hero from "../../components/Home/Hero/Hero";
import Categories from "../../components/Home/Categories/Categories";
import FeaturedProducts from "../../components/Home/FeaturedProducts/FeaturedProducts";
//component----------------------------
const Home = () => {
    return (
        <div className="home-page">


            <main>
                <Hero />
                <Categories />

                <FeaturedProducts />



            </main>
        </div>
    );
};
export default Home;