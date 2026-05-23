import React, { useState } from "react";
import person from "../assets/person.png";

const testimonialsData = [
  {
    img: person,
    text: `"My experience with Mark is a complete
success, from customer service, wide range of
products, clean store, purchasing experience, the
newsletter. Thank you."`,
    name: "Leona Paul",
    role: "CEO of Floatcom",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const changeTestimonial = (newIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsFading(false);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex =
      (activeIndex - 1 + testimonialsData.length) % testimonialsData.length;
    changeTestimonial(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % testimonialsData.length;
    changeTestimonial(newIndex);
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6" id="testimonials">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-12 text-center"
        style={{ color: "#264978" }}
      >
        Testimonials
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
        {/* Image */}
        <div
          className={`md:w-1/3 w-full flex justify-center transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            key={testimonialsData[activeIndex].name} // key مهم للانيميشن
            src={testimonialsData[activeIndex].img}
            alt={testimonialsData[activeIndex].name}
            className="rounded-lg object-cover max-w-[200px] md:max-w-full"
          />
        </div>

        {/* Text Section */}
        <div
          className={`md:w-2/3 w-full text-center md:text-left transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-lg whitespace-pre-line mb-6 text-gray-700">
            {testimonialsData[activeIndex].text}
          </p>
          <h3 className="text-xl font-semibold text-gray-900">
            {testimonialsData[activeIndex].name}
          </h3>
          <p className="text-gray-600">{testimonialsData[activeIndex].role}</p>

          {/* Controls */}
          <div className="flex justify-center md:justify-start gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#264978] flex items-center justify-center hover:bg-[#BF1E2E] focus:outline-none focus:ring-2 focus:ring-[#BF1E2E] transition-colors duration-300"
              aria-label="Previous Testimonial"
              disabled={isFading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#264978] flex items-center justify-center hover:bg-[#BF1E2E] focus:outline-none focus:ring-2 focus:ring-[#BF1E2E] transition-colors duration-300"
              aria-label="Next Testimonial"
              disabled={isFading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Testimonials;
