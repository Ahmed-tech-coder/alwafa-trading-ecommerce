import Navbar from "../../components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useResetCode } from "../../context/ResetCodeContext";
const CheckCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetCode } = useResetCode();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code) {
      toast.error("Please enter the code");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (code === resetCode) {
        toast.success("Code verified successfully!");
        navigate("/change-password");
      } else {
        toast.error("Incorrect code, please try again");
      }
      setLoading(false);
    }, 1000);
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
            <span style={{ color: "#264978" }}>Check</span>
            <span style={{ color: "#BF1E2E" }}> Code</span>
          </motion.h2>

          <motion.p
            className="text-center text-black font-medium mb-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Please enter the 4-digit code sent to your email
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label
                htmlFor="code"
                className="block mb-2 font-medium text-gray-700"
              >
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                maxLength={4}
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your 4-digit code"
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
              {loading ? "Verifying..." : "Verify"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckCode;
