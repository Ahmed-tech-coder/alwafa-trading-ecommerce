import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import woodBeam from "../assets/wood-beam.png";
import wood from "../assets/wood.png";
import logo from "../assets/Logo.png";

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

const contactItems = [
  {
    icon: <FaPhoneAlt />,
    title: "Call me",
    info: "+974 4460 0849 | +974 4460 2536",
    link: "tel:+97444600849",
  },
  {
    icon: <FaEnvelope />,
    title: "Email me",
    info: "admin@alwafa.com.qa",
    link: "mailto:admin@alwafa.com.qa",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    info: "Gate 96, Street 21, Industrial Area, Doha - Qatar",
    link: "https://www.google.com/maps/search/?api=1&query=Gate+96,+Street+21,+Industrial+Area,+Doha+-+Qatar",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: 0,
      userName: formData.userName,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ userName: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
      console.error("Submit error:", error);
    }
  };

  return (
    <section
      className="relative py-16 px-4 sm:px-6 max-w-6xl mx-auto"
      id="contact"
    >
      <img
        src={woodBeam}
        alt="Decoration Left Top"
        className="absolute top-0 right-0 w-24 sm:w-32 h-auto"
      />
      <img
        src={wood}
        alt="Decoration Right Bottom"
        className="absolute bottom-0 left-0 w-24 sm:w-32 h-auto"
      />
      <img
        src={logo}
        alt="Logo"
        className="absolute top-0 left-0 w-28 sm:w-36 h-auto"
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          <span style={{ color: "#264978" }}>Contact </span>
          <span style={{ color: "#BF1E2E" }}>Us</span>
        </h2>
        <p className="mt-4 text-gray-700 max-w-xl mx-auto">
          Let’s make something new, different and more meaningful or make things
          more visual or conceptual.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3 flex flex-col gap-6">
          {contactItems.map(({ icon, title, info, link }, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex bg-[#264978] rounded-md p-4 text-white items-center gap-4 hover:bg-[#1e3b63] transition-colors duration-300"
            >
              <div className="text-2xl text-white rounded-lg p-2">{icon}</div>
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p>{info}</p>
              </div>
            </a>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="md:w-2/3 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="flex-1 border border-[#264978] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BF1E2E]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="flex-1 border border-[#264978] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BF1E2E]"
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="border border-[#264978] rounded-md px-4 py-2 resize-none h-36 focus:outline-none focus:ring-2 focus:ring-[#BF1E2E]"
          />
          <button
            type="submit"
            className="bg-[#264978] text-white font-semibold py-3 rounded-md mt-4 hover:bg-[#BF1E2E] transition-colors duration-300"
          >
            Submit Message
          </button>
        </form>
      </div>

      <div className="mt-16 text-center">
        <h3
          className="text-xl sm:text-2xl font-bold mb-6"
          style={{ color: "#264978" }}
        >
          You can also contact about this platform
        </h3>
        <div className="flex justify-center gap-6 flex-wrap">
          {socialLinks.map(({ icon: Icon, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(180deg, #BF1E2E 0%, #264978 100%)",
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
    </section>
  );
};

export default ContactUs;
