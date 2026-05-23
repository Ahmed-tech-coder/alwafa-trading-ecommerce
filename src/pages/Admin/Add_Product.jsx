import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Add_Product = () => {
  const { token } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [thickness, setThickness] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://elwafastore.premiumasp.net/api/Service/GetAll"
        );
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        toast.error("Failed to fetch service data");
      }
    };

    fetchServices();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !serviceId) {
      toast.error(
        "Please fill in the required fields: ID, Name, and Service Number."
      );
      return;
    }

    if (!image) {
      toast.error("Please Add Image To Product");
      return;
    }

    const formData = new FormData();

    formData.append("Name", name);
    formData.append("quantity", quantity);
    formData.append("Width", width);
    formData.append("Length", length);
    formData.append("Thickness", thickness);
    formData.append("ServiceId", serviceId);
    formData.append("Picture", image);
    formData.append("Details", details);

    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Product",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Product Added Successfully");
        setName("");
        setQuantity(1);
        setWidth("");
        setLength("");
        setThickness("");
        setServiceId("");
        setImage(null);
        document.getElementById("imageUpload").value = "";
        setTimeout(() => {
          window.location.href = "/admin/product";
        }, 300);
      } else {
        const errorText = await response.text();
        toast.error(`Transmission failure: ${errorText}`);
      }
    } catch (error) {
      toast.error(`An error occurred while sending: ${error.message}`);
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
          / Add Product
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
        {/* Quantity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <label className="mb-2 text-[#264978] font-semibold">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
          />
        </motion.div>

        {/* Width */}
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

        {/* Length */}
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

        {/* Thickness */}
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

      {/* serviceId Dropdown */}
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
          <option value="">Select Service</option>
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
        transition={{ delay: 0.8 }}
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
          placeholder="Add product details here..."
        ></textarea>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        className="max-w-3xl mx-auto"
      >
        <button
          onClick={handleAddProduct}
          className="bg-[#264978] w-full py-3 rounded text-white font-semibold text-lg hover:bg-[#16335C] transition"
        >
          Add Product
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Add_Product;
