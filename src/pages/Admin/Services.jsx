import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-50px" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: "50px", transition: { duration: 0.3 } },
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const navigator = () => {
    setTimeout(() => {
      navigate("/admin/add-service");
    }, 100);
  };

  const UpdateProduct = (service) => {
    navigate("/admin/update-service", { state: { service } });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("https://elwafastore.premiumasp.net/api/Service/GetAll")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        toast.error("Failed to fetch services.");
        console.error(err);
      });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmDeleteDiscount = () => {
    if (!selectedProduct) return;

    axios
      .delete(
        `https://elwafastore.premiumasp.net/api/Service?Id=${selectedProduct.id}`
      )
      .then(() => {
        toast.success("service deleted successfully!");
        setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        toast.error("Failed to delete service.");
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-[#E9EFF9] min-h-screen mt-20 relative">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="bg-[#D23403] p-8 rounded-xl w-11/12 max-w-sm text-white"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-8 text-center">
                Delete Service
              </h2>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <motion.button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 flex-1"
                  whileHover={buttonHover}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleConfirmDeleteDiscount}
                  className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 flex-1"
                  whileHover={buttonHover}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-black text-3xl font-bold">Services</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative text-[#264978] flex-grow sm:flex-grow-0 w-full sm:w-auto">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-[#264978] font-semibold px-12 sm:px-20 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978] w-full"
              style={{ color: "#264978" }}
            />
          </div>
          <motion.button
            onClick={navigator}
            className="bg-[#264978] text-white px-12 py-2 rounded-md font-semibold hover:bg-[#1f3d67]"
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
          >
            Add Service
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center min-w-[800px]">
          <thead>
            <tr
              style={{
                backgroundColor: "#264978",
                color: "white",
                fontSize: "20px",
              }}
            >
              <th className="py-3 px-4 border-r whitespace-nowrap">ID</th>
              <th className="py-3 px-4 border-r whitespace-nowrap">
                Service Name
              </th>
              <th className="py-3 px-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p, idx) => (
              <tr
                key={p.id}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#FFFFFF99",
                }}
                className="text-[#000000]"
              >
                <td className="py-3 px-4 border-r">{p.id}</td>
                <td className="py-3 px-4 border-r">
                  <span
                    onClick={() => UpdateProduct(p)}
                    style={{ borderBottom: "black solid ", cursor: "pointer" }}
                  >
                    {p.name}
                  </span>
                </td>
                <td className="py-3 px-4 flex justify-center gap-2 whitespace-nowrap">
                  <motion.button
                    onClick={() => {
                      setSelectedProduct(p);
                      setShowDeleteModal(true);
                    }}
                    className="bg-[#D23403] text-white px-3 py-1 rounded-md hover:bg-[#a32902]"
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
