import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import vectorRightImg from "../assets/rightVector.png";
import vectorLeftImg from "../assets/leftVector.png";

import firstCategoryImg from "../assets/firstCategory.png";
import secondCategoryImg from "../assets/secondCategory.png";
import thirdCategoryImg from "../assets/thirdCategory.png";
import fourthCategoryImg from "../assets/fourthCategory.png";
import fiveCategoryImg from "../assets/fiveCategory.png";
import sixCategoryImg from "../assets/sixCategory.png";
import sevenCategoryImg from "../assets/sevenCategory.jpg";
import eightCategoryImg from "../assets/eightCategory.jpg";
import nineCategoryImg from "../assets/nineCategory.jpg";
import tenCategoryImg from "../assets/tenCategory.jpg";

const ServicesSection = ({ variant = "default" }) => {
  const [services, setServices] = useState([]);

  const navigate = useNavigate();
  const navigator = () => navigate("/services");
  const images = [
    firstCategoryImg,
    secondCategoryImg,
    thirdCategoryImg,
    fourthCategoryImg,
    fiveCategoryImg,
    sixCategoryImg,
    sevenCategoryImg,
    eightCategoryImg,
    nineCategoryImg,
    tenCategoryImg,
  ];

  useEffect(() => {
    fetch("https://elwafastore.premiumasp.net/api/Service/GetAll")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <section className="relative py-16 px-4 md:px-6 bg-white" id="services">
      {/* Decorative Images */}
      <img
        src={vectorRightImg}
        alt="Decoration Top Right"
        className="absolute top-12 right-4 md:right-32 w-20 md:w-32 h-auto z-0"
      />
      <img
        src={vectorLeftImg}
        alt="Decoration Bottom Left"
        className="absolute bottom-12 left-4 md:left-32 w-20 md:w-32 h-auto z-0"
      />

      {/* Title */}
      {variant === "servicesPage" ? (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 z-10 relative">
          <span style={{ color: "#264978" }}>Choose</span>{" "}
          <span style={{ color: "#BF1E2E" }}>Your Service</span>
        </h2>
      ) : (
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 z-10 relative"
          style={{ color: "#264978" }}
        >
          Services
        </h2>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16 max-w-6xl mx-auto z-10 relative">
        {(variant === "servicesPage" ? services : services.slice(0, 4)).map(
          (service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative w-full flex flex-col items-center text-center overflow-hidden rounded-md shadow-lg"
            >
              <img
                src={images[index]}
                alt={service.name}
                className="w-full h-72 object-cover rounded-md"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md space-y-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  {service.name}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-2 rounded-md font-semibold bg-white text-[#264978] shadow-md"
                  onClick={() => navigate(`/shop?category=${service.id}`)}
                >
                  Explore
                </motion.button>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* CTA Button - only for default variant */}
      {variant !== "servicesPage" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 z-10 relative"
        >
          <motion.button
            onClick={navigator}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-3 rounded-md text-white text-lg font-semibold shadow-md"
            style={{
              background: "linear-gradient(180deg, #BF1E2E 0%, #264978 100%)",
            }}
          >
            All Service ...
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default ServicesSection;
