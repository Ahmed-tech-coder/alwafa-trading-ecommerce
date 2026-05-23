import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Add_Admin = () => {
  const { token } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAddAdmin = async () => {
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !number ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Account/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            userName,
            phoneNumber: number,
            email,
            password,
            userType: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to register admin.");
      }

      toast.success("Admin registered successfully!");

      setFirstName("");
      setLastName("");
      setUserName("");
      setNumber("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        window.location.href = "/admin/admin";
      }, 1000);
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
        <div className="text-[#00000080] px-6 py-2 text-3xl">Admin</div>
        <div className="text-black px-6 py-2 text-2xl">/ Add Admin</div>
      </div>

      {/* First Name + Last Name */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-black font-semibold">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </div>
        <div>
          <label className="block mb-2 text-black font-semibold">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </div>
      </div>

      {/* User Name + Phone Number */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-black font-semibold">User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </div>
        <div>
          <label className="block mb-2 text-black font-semibold">Phone Number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </div>
      </div>

      {/* Email */}
      <div className="max-w-3xl mx-auto mb-6">
        <label className="block mb-2 text-black font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
        />
      </div>

      {/* Password + Confirm Password with Eye icon */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 relative">
        <div className="relative">
          <label className="block mb-2 text-black font-semibold">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
          <div
            className="absolute top-[38px] right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </div>
        </div>
        <div className="relative">
          <label className="block mb-2 text-black font-semibold">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
          <div
            className="absolute top-[38px] right-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </div>
        </div>
      </div>

      {/* Add Admin Button */}
      <div className="max-w-3xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddAdmin}
          className="w-full bg-[#264978] text-white font-semibold py-3 rounded-md hover:bg-[#1f3d67] transition-colors duration-300"
        >
          Add Admin
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

export default Add_Admin;
