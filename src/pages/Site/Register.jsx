import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    userName: formData.userName,
    phoneNumber: formData.number,
    email: formData.email,
    password: formData.password,
    userType: 0,
  };

  try {
    const response = await fetch(
      "https://elwafastore.premiumasp.net/api/Account/Register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      toast.success("Registration successful! Redirecting to login...");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      // Check specific backend error structure
      if (responseData?.errors) {
        const errorMessages = Object.values(responseData.errors).flat();
        errorMessages.forEach((msg) => toast.error(msg));
      } else if (responseData?.message) {
        toast.error(responseData.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  } catch (error) {
    console.error("Register error:", error);
    toast.error("Network error. Please check your connection and try again.");
  }
};


  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFEBED] to-[#EBF4FF]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl w-full bg-white p-6 sm:p-10 rounded-xl shadow-md py-10 sm:py-16"
        >
          <motion.h2
            className="text-4xl font-montserrat font-extrabold mb-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ color: "#264978" }}>Sign</span>
            <span style={{ color: "#BF1E2E" }}> up</span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: "firstName",
                  label: "First Name",
                  type: "text",
                },
                {
                  id: "lastName",
                  label: "Last Name",
                  type: "text",
                },
              ].map(({ id, label, type }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor={id}
                    className="block mb-2 font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    value={formData[id]}
                    onChange={handleChange}
                    className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                  />
                </motion.div>
              ))}

              {/* Number */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <label
                  htmlFor="number"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Number
                </label>
                <input
                  id="number"
                  name="number"
                  type="tel"
                  required
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                />
              </motion.div>

              {/* Username */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <label
                  htmlFor="userName"
                  className="block mb-2 font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                />
              </motion.div>

              {/* Email field with col-span-2 */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                />
              </motion.div>

              {/* Password fields */}
              {["password", "confirmPassword"].map((field) => (
                <motion.div
                  key={field}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor={field}
                    className="block mb-2 font-medium text-gray-700"
                  >
                    {field === "password" ? "Password" : "Confirm Password"}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={showPasswords[field] ? "text" : "password"}
                    required
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={
                      field === "password"
                        ? "Enter your password"
                        : "Confirm your password"
                    }
                    className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field)}
                    className="absolute top-9 right-3 text-gray-500 hover:text-[#BF1E2E] transition"
                    tabIndex={-1}
                    aria-label="Toggle Password Visibility"
                  >
                    {showPasswords[field] ? (
                      <FiEye size={20} />
                    ) : (
                      <FiEyeOff size={20} />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 text-white font-bold text-lg rounded-full bg-gradient-to-r from-[#264978] to-[#BF1E2E] hover:brightness-110 transition"
            >
              Create account
            </motion.button>
          </form>

          <p className="mt-10 text-center font-light text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#BF1E2E] hover:underline hover:underline-offset-4 transition"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
