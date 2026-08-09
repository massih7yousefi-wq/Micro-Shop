//Imports-----------------------
import "./Home.css";
import Header from "../../components/Home/Header/Header";
import Footer from "../../components/Home/Footer/Footer";
import Hero from "../../components/Home/Hero/Hero";
import Categories from "../../components/Home/Categories/Categories";
//component----------------------------
const Home = () => {
    return (
        <div className="home-page">
            <Header />

            <main>
                <Hero />
                <Categories />
                <section>
                    Featured Product
                </section>

                <Footer />

            </main>
        </div>
    );
};
export default Home;