import HeroSection from "../../components/home/HeroSection";
import Features from "../../components/home/Features";
import Statistics from "../../components/home/Statistics";
import Categories from "../../components/home/Categories";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Testimonials from "../../components/home/Testimonials";
import CTASection from "../../components/home/CTASection";
import Newsletter from "../../components/home/Newsletter";

const Home = () => {
  return (
    <>
      <HeroSection />

      <Features />

      <Statistics />

      <Categories />

      <FeaturedProducts />

      <WhyChooseUs />

      <Testimonials />

      <CTASection />

      <Newsletter />
    </>
  );
};

export default Home;