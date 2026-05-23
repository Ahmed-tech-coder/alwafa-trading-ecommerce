import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

import HeroSection from "../../components/HeroSection";
import ServicesSection from "../../components/ServicesSection";
import AboutSection from "../../components/AboutSection";
import ContactUsSection from "../../components/ContactUsSection";
import Testimonials from "../../components/TestimonialsSection";
import Footer from "../../components/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(scrollTo, {
          smooth: true,
          duration: 500,
          offset: -80,
        });
      }, 500);
    }
  }, [location]);

  return (
    <div className="pt-20">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactUsSection />
      <Testimonials />
    </div>
  );
};

export default Home;
