import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import companyLogo from "../../assets/companyIcon.png";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Account/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      const { token, userName, id, role } = data;

      if (token && role === "Admin") {
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);

        login(token, userName, id, role);

        toast.success("Logged in successfully!");
        window.location.href = "/admin/dashboard";
      } else {
        toast.error("You are not authorized as an admin.");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Network error: " + error.message);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#E9EFF9" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#264978]  backdrop-blur-md p-8 py-20 rounded-xl shadow-xl w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={companyLogo} alt="AlWafa Logo" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign In
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center"
        >
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Your Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 p-2  rounded-md focus:outline-none"
              style={{ backgroundColor: "#D5E7FF33", color: "white" }}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 p-2  rounded-md focus:outline-none"
              style={{ backgroundColor: "#D5E7FF33", color: "white" }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-9 right-3 text-white hover:text-[#BF1E2E] transition"
              tabIndex={-1}
              disabled={loading}
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className=" px-10 py-1 rounded-md font-semibold"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #264978",
              color: "#264978",
            }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
