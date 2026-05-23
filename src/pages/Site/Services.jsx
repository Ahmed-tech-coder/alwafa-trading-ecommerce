import React from "react";
import { motion } from "framer-motion";
import ServicesSection from "../../components/ServicesSection";
import bgImage from "../../assets/bgImage.png";

const Services = () => {
  return (
    <div className="mt-20">
      <div className="w-full flex justify-center items-center relative">
        <img src={bgImage} alt="Services" className="w-full h-24 md:h-72" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute text-white text-4xl md:text-6xl font-bold px-4 md:px-8 py-2 md:py-4 rounded-md"
        >
          Service
        </motion.h1>
      </div>

      <div>
        <ServicesSection variant="servicesPage" />
      </div>
    </div>
  );
};

export default Services;
