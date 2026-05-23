import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/FooterLogo.png";

const socialLinks = [
  {
    icon: FaFacebookF,
    url: "https://www.facebook.com/share/15j2ZyRxZT/",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/alwafatrading.qa?igsh=MzRlODBiNWFlZA==",
  },
];

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleNavigateScroll = (section) => {
    navigate("/", { state: { scrollTo: section } });
  };

  const links = [
    { label: "Services", section: "services" },
    { label: "About Us", section: "about" },
    { label: "Contact", section: "contact" },
    { label: "Testimonials", section: "testimonials" },
  ];

  return (
    <footer
      className={`text-white pt-24 pb-6 space-y-10 transition-opacity duration-1000 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "linear-gradient(180deg, #BF1E2E 0%, #264978 100%)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between md:gap-8 gap-12">
        {/* Left - Logo and Text */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <img src={logoImg} alt="ALWAFA Logo" className="h-auto" />
          <h4 className="font-montserrat font-bold text-xl">ALWAFA</h4>
          <p className="text-gray-200">
            Al Wafa is a successful family run business, established and founded
            by Mr. Ahmed Abbas in Doha, Qatar in 1959, a partnership with Mr.
            Khalid Bin Ahmed Al Sowaidi (Chairman Of Qatar Islamic Bank).
          </p>
        </div>

        {/* Center - Links */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-3 text-lg text-center md:text-left">
          <h2 className="font-montserrat font-bold text-xl">Links</h2>
          {links.map(({ label, section }, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigateScroll(section)}
              className="hover:underline transition-colors duration-300"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right - Contact Info */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <h2 className="font-montserrat font-bold text-xl">Contact us</h2>
          <p>Phone: +974 4460 0849</p>
          <p>Phone: +974 4460 2536</p>

          <div className="flex justify-center gap-6 mt-4">
            {socialLinks.map(({ icon: Icon, url }, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_#BF1E2E]"
                style={{
                  background:
                    "linear-gradient(180deg, #BF1E2E 0%, #264978 100%)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon color="white" size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-t border-white mt-10 mb-4 max-w-6xl mx-auto" />

      <p className="text-center text-white text-sm">
        © 2025 Copyright . All rights reserved.{" "}
        <span>
          <a
            href="https://wa.me/201016148495"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300 transition-colors duration-300"
          >
            Ahmed Refat
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
