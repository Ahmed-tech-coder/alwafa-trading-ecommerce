import Navbar from "../../components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { useResetCode } from "../../context/ResetCodeContext";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { setResetCode, setResetEmail } = useResetCode();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://elwafastore.premiumasp.net/api/Account/SendEmail?Email=${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResetEmail(email);
        setResetCode(data.toString());

        toast.success(`Reset code sent to: ${email}`);
        navigate("/check-code");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send reset email");
      }
    } catch (error) {
      toast.error("Network error, please try again");
      console.error("Error sending reset email:", error);
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
          className="max-w-md w-full bg-white p-8 rounded-xl shadow-md py-32"
        >
          <motion.h2
            className="text-4xl font-montserrat font-bold mb-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ color: "#264978" }}>Forget</span>
            <span style={{ color: "#BF1E2E" }}> Password</span>
          </motion.h2>

          <motion.p
            className="text-center text-black font-medium mb-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Check your email
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus-ring-animated focus:outline-none focus:ring-0 placeholder:text-[15px]"
                disabled={loading}
              />
            </motion.div>

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
              {loading ? "Sending..." : "Done"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgetPassword;
