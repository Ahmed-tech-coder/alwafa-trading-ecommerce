import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f9f7f1] px-6">
      <h1
        className="text-[10rem] font-extrabold text-gradient mb-6 select-none"
        style={{
          background:
            "linear-gradient(90deg, #BF1E2E 0%, #264978 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </h1>
      <p className="text-lg text-[#555] max-w-md mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#BF1E2E] hover:bg-[#8f1722] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        aria-label="Back to Home"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
