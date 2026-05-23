import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useResetCode } from "../../context/ResetCodeContext";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetEmail } = useResetCode();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const email = resetEmail;
    if (!email) {
      toast.error("Please start the password reset process first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Account/ChangePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            Newpassword: password,
          }),
        }
      );

      if (response.ok) {
        toast.success("Password changed successfully!");
        localStorage.removeItem("resetEmail");
        window.location.href = "/login";
      } else {
        try {
          const text = await response.text();
          const errorData = JSON.parse(text);
          toast.error(errorData.message || "Failed to change password");
        } catch {
          toast.error("Failed to change password");
        }
      }
    } catch (error) {
      toast.error("Network error, please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFEBED] to-[#EBF4FF]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full bg-white p-10 rounded-xl shadow-md py-24"
        >
          <motion.h2
            className="text-4xl font-montserrat font-bold mb-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ color: "#264978" }}>Change</span>
            <span style={{ color: "#BF1E2E" }}> Password</span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Password */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
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
                placeholder="Enter new password"
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-9 right-3 text-gray-500 hover:text-[#BF1E2E] transition"
                tabIndex={-1}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-9 right-3 text-gray-500 hover:text-[#BF1E2E] transition"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <FiEye size={20} />
                ) : (
                  <FiEyeOff size={20} />
                )}
              </button>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[60%] py-2 rounded-md text-white font-semibold mx-auto block shadow-md"
              style={{
                background:
                  "linear-gradient(93.94deg, #264978 2.34%, #BF1E2E 98.5%)",
              }}
              disabled={loading}
            >
              {loading ? "Changing..." : "Done"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;
