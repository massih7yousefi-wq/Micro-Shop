import "./Home.css";

import Hero from "../../components/Home/Hero/Hero";
import Categories from "../../components/Home/Categories/Categories";
import FeaturedProducts from "../../components/Home/FeaturedProducts/FeaturedProducts";
import RegisterCTA from "../../components/Home/RegisterCTA/RegisterCTA";

import VideoBackground from "../../components/Common/VideoBackground/VideoBackground";


const Home = () => {
    return (
        <div className="home-page">

            <main>

                {/* Hero */}
                <Hero />


                {/* Categories + Featured Products */}
                <section className="home-products-section">

                    <VideoBackground />

                    <div className="home-products-content">

                        <Categories />

                        <FeaturedProducts />

                    </div>

                </section>


                {/* Register CTA */}
                <RegisterCTA />

            </main>

        </div>
    );
};

export default Home;