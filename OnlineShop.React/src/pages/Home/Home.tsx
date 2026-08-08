//Imports-----------------------
import "./Home.css";
import Header from "../../components/Home/Header/Header";
import Footer from "../../components/Home/Footer/Footer";
import Hero from "../../components/Home/Hero/Hero";
//component----------------------------
const Home = () => {
    return (
        <div className="home-page">
            <Header />

            <main>
                <Hero />

                <section>
                    Featured Product
                </section>

                <Footer />

            </main>
        </div>
    );
};
export default Home;