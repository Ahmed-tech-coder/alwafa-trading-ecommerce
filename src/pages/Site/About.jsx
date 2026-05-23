import React from "react";
import { motion } from "framer-motion";

import bgImage from "../../assets/bgImage.png";
import aboutImage from "../../assets/workingwood.png";
import whyImg1 from "../../assets/whyImage1.png";
import whyImg2 from "../../assets/whyImage2.png";
import process1 from "../../assets/process1.png";
import process2 from "../../assets/process2.png";
import process3 from "../../assets/process3.png";
import process4 from "../../assets/process4.png";

const processImages = [
  {
    img: process1,
    title: "Meet Customers",
    desc: "Our on-site managers will meet the clients.",
  },
  {
    img: process2,
    title: "Discuss Concept",
    desc: "On-site designers will discuss the clients design concepts and requirements.",
  },
  {
    img: process3,
    title: "Design & Install",
    desc: "Our carpenters will deliver and install the required works on schedule.",
  },
  {
    img: process4,
    title: "Confirm Agreement",
    desc: "Upon agreement, a contract will be made between the client and the company.",
  },
];

const About = () => {
  return (
    <div className="h-auto bg-white font-sans select-none mt-16">
      {/* Hero Section */}

      <div className="w-full flex justify-center items-center relative">
        <img src={bgImage} alt="Services" className="w-full h-24 md:h-72" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute text-white text-4xl md:text-6xl font-bold px-4 md:px-8 py-2 md:py-4 rounded-md"
        >
          About
        </motion.h1>
      </div>

      {/* Why Choose Us Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mt-12 px-4">
        <span className="text-[#264978]">Why </span>
        <span className="text-[#BF1E2E]">Choose Us?</span>
      </h2>

      {/* About Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 my-16 px-4">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={aboutImage}
            alt="About AL Wafa"
            className="rounded-lg shadow-lg w-full max-w-sm object-cover"
          />
        </motion.div>

        {/* Right Paragraphs */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 flex flex-col gap-6 text-center "
        >
          {[
            "Al Wafa is a successful family run business, established and founded by Mr. Ahmed Abbas in Doha, Qatar in 1959, a partnership with Mr. Khalid Bin Ahmed Al Sowaidi (Chairman Of Qatar Islamic Bank).",
            "Al Wafa supplies high quality timber and building materials to meet a wide range of specifications, sourced from Europe, North and South America and Asia. Our timber is machined on site to a very high standard. We are proud of our timber background, a history of traditional craftsmanship balanced by an investment in people and lasting relationships with our trade clients.",
            "Al Wafa customers range from large to small scale such as Governmental sectors, furniture manufacturers, joinery workshops, building contractors,and specialist traders.",
          ].map((text, i) => (
            <div key={i}>
              <p className="text-gray-800 text-base md:text-lg">{text}</p>
              {i !== 2 && (
                <hr className="border-t-4 border-red-600 w-48 my-4 mx-auto rounded-md mt-10" />
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#BF1E2E] text-white py-12 rounded-lg w-[80vw]  mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center  md:w-full">
          {[
            { num: "12", label: "Year Experience" },
            { num: "247", label: "Professional Workers" },
            { num: "98%", label: "Satisfied Clients" },
            { num: "742", label: "Successful Projects" },
          ].map(({ num, label }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
            >
              <span className="text-4xl md:text-5xl font-extrabold">{num}</span>
              <span className="mt-2 text-sm md:text-lg font-semibold">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Cards */}
      <section className="max-w-6xl mx-auto px-4 my-20 md:mb-40">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
          <span className="text-[#264978]">Why </span>
          <span className="text-[#BF1E2E]">Choose Us?</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 ">
          {/* Left Cards */}
          <div className="flex flex-col gap-8">
            {[
              {
                num: "01",
                title: "Engineers",
                desc: "We are Professional Engineers",
              },
              { num: "03", title: "Team Members", desc: "We Are Trusted" },
            ].map(({ num, title, desc }, i) => (
              <motion.div
                key={i}
                className="w-64 bg-white rounded-lg p-6 "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 0.5 }}
              >
                <div
                  className="text-2xl font-extrabold text-center rounded-md text-white mb-4"
                  style={{
                    background:
                      "linear-gradient(180deg, #BF1E2E 0%, #264978 100%)",
                    padding: "2px 0",
                  }}
                >
                  {num}
                </div>
                <h3 className="text-xl font-bold text-[#264978] text-center mb-2">
                  {title}
                </h3>
                <p className="text-black text-center">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Middle Images */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <motion.img
              src={whyImg1}
              alt="Why Choose Us 1"
              className="rounded-lg shadow-lg w-40 h-40 md:w-auto md:h-auto object-cover "
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            />
            <motion.img
              src={whyImg2}
              alt="Why Choose Us 2"
              className="absolute top-28 left-28 w-40 h-40 md:w-auto md:h-auto border-4 border-white rounded-lg shadow-lg object-cover"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            />
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-8">
            {[
              { num: "02", title: "Designers", desc: "We are creative." },
              {
                num: "04",
                title: "AEIO Certified",
                desc: "Certified Products",
              },
            ].map(({ num, title, desc }, i) => (
              <motion.div
                key={i}
                className="w-64 bg-white rounded-lg p-6 "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 0.8 }}
              >
                <div
                  className="text-2xl font-extrabold text-center rounded-md text-white mb-4"
                  style={{
                    background:
                      "linear-gradient(180deg, #BF1E2E 0%, #264978 100%)",
                    padding: "4px 16px",
                  }}
                >
                  {num}
                </div>
                <h3 className="text-xl font-bold text-[#264978] text-center mb-2">
                  {title}
                </h3>
                <p className="text-black text-center">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="max-w-6xl mx-auto px-4 my-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
          <span className="text-[#264978]">Working </span>
          <span className="text-[#BF1E2E]">Process</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {processImages.map(({ img, title, desc }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center bg-white p-6 rounded-lg "
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <img
                src={img}
                alt={title}
                className=" object-cover rounded-md mb-4"
              />
              <h3 className="text-[#264978] text-2xl font-bold mb-2 text-center">
                {title}
              </h3>
              <p className="text-black text-center">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
