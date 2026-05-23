import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      toast.success("Logged in successfully!");

      if (data.token) {
        login(data.token, data.userName, data.id, data.userType || "User");
      }

      setLoading(false);

      navigate("/");
    } catch (error) {
      toast.error("Network error: " + error.message);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFEBED] to-[#EBF4FF]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white p-10 rounded-xl shadow-md py-16"
        >
          <motion.h2
            className="text-4xl font-montserrat font-extrabold mb-8 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ color: "#264978" }}>Sign</span>
            <span style={{ color: "#BF1E2E" }}> In</span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none  placeholder:text-[15px]"
                disabled={loading}
              />
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none  placeholder:text-[15px]"
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-9 right-3 text-gray-500 hover:text-[#BF1E2E] transition"
                tabIndex={-1}
                disabled={loading}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
              <div className="mt-1 text-right">
                <Link
                  to="/forget-password"
                  className="text-sm text-[#264978] font-medium hover:underline"
                >
                  Forget your password?
                </Link>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              className={`w-[60%] py-2 rounded-md text-white font-semibold mx-auto block ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              style={{
                background:
                  "linear-gradient(93.94deg, #264978 2.34%, #BF1E2E 98.5%)",
              }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </motion.button>
          </form>

          <motion.p
            className="mt-8 text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            if you don't have account!{" "}
            <Link
              to="/register"
              className="text-[#264978] font-semibold hover:underline"
            >
              sign up
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
