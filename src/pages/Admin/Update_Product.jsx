import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const product = location.state?.product || {};

  const [name, setName] = useState(product.name || "");
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [width, setWidth] = useState(product.width || "");
  const [length, setLength] = useState(product.length || "");
  const [thickness, setThickness] = useState(product.thickness || "");
  const [serviceId, setServiceId] = useState(product.serviceId || "");
  const idFromState = location.state?.id || product.id || "";
  const [id, setId] = useState(idFromState);
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState(product.details || "");
  const [services, setServices] = useState([]);
  const [PictureUrl, setPictureUrl] = useState(product.pictureUrl || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(
          "https://elwafastore.premiumasp.net/api/Service/GetAll"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    }
    fetchServices();
  }, []);

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("Id", id);
      formData.append("Name", name);
      formData.append("Quantity", quantity);
      formData.append("Width", width);
      formData.append("Length", length);
      formData.append("Thickness", thickness);
      formData.append("ServiceId", serviceId);
      formData.append("PictureUrl", PictureUrl);
      formData.append("Details", details);

      if (image) {
        formData.append("Picture", image);
      } else {
        // formData.append("Picture", "");
      }

      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Product",
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      if (text) {
        try {
          // const data = JSON.parse(text);
          toast.success("Product updated successfully!");
        } catch (error) {
          toast.success(`Product updated successfully! ${error}`);
        }
      } else {
        toast.success("Product updated successfully! ");
        setTimeout(() => {
          window.location.href = "/admin/product";
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
          Product
        </div>
        <div className="text-black px-4 md:px-6 py-2 text-xl md:text-2xl">
          / Update Product
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex justify-center mb-8"
      >
        <label
          htmlFor="imageUpload"
          className="bg-[#D9D9D9] w-44 h-44 sm:w-56 sm:h-40 flex flex-col items-center justify-center rounded-full cursor-pointer hover:opacity-90 transition-all duration-300 overflow-hidden"
        >
          {image ? (
            <motion.img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="object-cover w-full h-full rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : PictureUrl ? (
            <motion.img
              src={PictureUrl}
              alt="Current"
              className="object-cover w-full h-full rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <>
              <span className="text-white text-sm sm:text-lg font-semibold mb-1">
                Add Image
              </span>
              <FaImage size={32} className="text-[#264978]" />
            </>
          )}
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </motion.div>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6 mb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block mb-2 text-[#264978] font-semibold">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </motion.div>
      </div>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <label className="mb-2 text-[#264978] font-semibold">Quantity</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity((e.target.value))}
              className="text-center w-full py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col"
        >
          <label className="mb-2 text-[#264978] font-semibold">Width</label>
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col"
        >
          <label className="mb-2 text-[#264978] font-semibold">Length</label>
          <input
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col"
        >
          <label className="mb-2 text-[#264978] font-semibold">Thickness</label>
          <input
            type="text"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-3xl mx-auto mb-6 px-4"
      >
        <label className="block mb-2 text-[#264978] font-semibold">
          Service
        </label>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="w-full max-w-3xl mx-auto mb-6 px-4"
      >
        <label className="block mb-2 text-[#264978] font-semibold">
          Details
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
        />
      </motion.div>

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
          Update Product
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default UpdateProduct;
