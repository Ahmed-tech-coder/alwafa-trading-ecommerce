import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const UpdateService = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const service = location.state?.service || {};

  const [name, setName] = useState(service.name || "");

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Service",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: service.id,
            name: name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      if (text) {
        try {
          const data = JSON.parse(text);
          toast.success("Product updated successfully!");
          console.log("Response data:", data);
        } catch (error) {
          toast.success("Product updated successfully! (Non-JSON response)");
          console.log("Response text:", text);
        }
      } else {
        toast.success("Product updated successfully! ");
        setTimeout(() => {
          window.location.href = "/admin/services";
        }, 300);
      }
    } catch (error) {
      toast.error("Failed to update product: " + error.message);
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 md:p-8 bg-[#E9EFF9] min-h-screen mt-20"
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex text-white text-lg font-bold rounded overflow-hidden mb-6 w-max"
      >
        <div className="text-[#00000080] px-4 md:px-6 py-2 text-2xl md:text-3xl">
          Services
        </div>
        <div className="text-black px-4 md:px-6 py-2 text-xl md:text-2xl">
          / Update Service
        </div>
      </motion.div>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6 mb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block mb-2 text-[#264978] font-semibold">
            Service Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-3xl mx-auto px-4"
      >
        <motion.button
          onClick={handleUpdateProduct}
          className="w-full bg-[#264978] text-white font-semibold py-3 rounded-md hover:bg-[#1f3d67] transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Service
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default UpdateService;
