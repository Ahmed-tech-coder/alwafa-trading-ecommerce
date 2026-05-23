import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import heroImage from "../assets/wallpaper1.jpg";
import heroImage2 from "../assets/wallpaper2.jpg";
import heroImage3 from "../assets/wallpaper3.jpg";
import heroImage4 from "../assets/wallpaper4.jpg";
import heroImage5 from "../assets/wallpaper5.jpg";

const images = [heroImage, heroImage2, heroImage3, heroImage4, heroImage5];

const HeroSection = () => {
  const navigate = useNavigate();

  const navigator = () => {
    setTimeout(() => {
      navigate("/shop");
    }, 200);
  };

  return (
    <section id="home" className="h-[90vh] w-full relative">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-[90vh] w-full bg-cover bg-center flex flex-col items-center justify-end px-4"
              style={{ backgroundImage: `url(${img})` }}
            >
              <button
                onClick={navigator}
                type="button"
                className="mb-16 text-white font-semibold text-lg md:text-4xl py-2 px-10 rounded-lg shadow-md z-10"
                style={{
                  background:
                    "linear-gradient(93.94deg, #264978 2.34%, #BF1E2E 98.5%)",
                }}
              >
                Shop Now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
