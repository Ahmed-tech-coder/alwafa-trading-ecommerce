import portrait from "../assets/portrait.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutSection = () => {
  const navigate = useNavigate();
  const navigator = () => {
    setTimeout(() => {
      navigate("/about");
    }, 500);
  };
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center max-w-6xl mx-auto py-16 px-4 sm:px-6 gap-12"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2 w-full text-left"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold"
          style={{ color: "#264978" }}
        >
          ABOUT <span style={{ color: "#BF1E2E" }}>ALWAFA</span>
        </h2>

        <p className="mt-6 text-gray-700 leading-relaxed text-sm sm:text-base">
          Al - Wafa is a successful family running business, it has been
          established and founded by Mr. Ahmed Abbas in Doha – Qatar in the year
          1959, with a partnership of Mr. Khalid Bin Ahmed Al Sowaidi (Chairman
          Of Qatar Islamic Bank).
          <br />
          <br />
          Al – Wafa supplies high quality timbers, building materials and paint
          products to meet a wide range of specifications, sourced from Europe,
          North and South America and Asia, Machined on site to very high
          quality, we are proud of our timber background, a history of
          traditional craftsmanship balance by an investment in people, in a new
          technology quality control and in lasting relationships with our trade
          clients.
        </p>

        <motion.button
          onClick={navigator}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 rounded-md text-white font-semibold shadow-md"
          style={{
            background:
              "linear-gradient(93.94deg, #264978 2.34%, #BF1E2E 98.5%)",
          }}
        >
          More About Us ..
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2 w-full"
      >
        <img
          src={portrait}
          alt="About Al Wafa"
          className="w-full h-auto rounded-md object-cover"
        />
      </motion.div>
    </section>
  );
};

export default AboutSection;
