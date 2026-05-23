import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add_Service = () => {
  const { token } = useContext(AuthContext);

  const [name, setName] = useState("");

  const handleAddService = async () => {
    if (!name.trim()) {
      toast.error("Please enter the service name!");
      return;
    }

    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Service",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: 0,
            name: name.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to add service.");
      }

      toast.success("Service added successfully!");
      setName("");
      setTimeout(() => {
        window.location.href = "/admin/services";
      }, 300);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-8 bg-[#E9EFF9] min-h-screen mt-20"
    >
      {/* العنوان */}
      <div className="flex flex-wrap gap-2 text-white text-lg font-bold rounded overflow-hidden mb-6 w-max">
        <div className="text-[#00000080] px-6 py-2 text-3xl">Service</div>
        <div className="text-black px-6 py-2 text-2xl">/ Add Service</div>
      </div>

      {/* اسم الخدمة */}
      <div className="max-w-3xl mx-auto mb-6">
        <label className="block mb-2 text-black font-semibold">
          Service Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          placeholder="Enter service name"
        />
      </div>

      {/* زر الإضافة */}
      <div className="max-w-3xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddService}
          className="w-full bg-[#264978] text-white font-semibold py-3 rounded-md hover:bg-[#1f3d67] transition-colors duration-300"
        >
          Add Service
        </motion.button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </motion.div>
  );
};

export default Add_Service;
