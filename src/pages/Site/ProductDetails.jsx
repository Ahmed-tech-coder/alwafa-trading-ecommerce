import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";
import AddToCartButton from "../../components/AddToCartButton";

const ProductDetails = () => {
  const { state } = useLocation();
  const { category } = state || {};
  const currentProduct = state || {};

  const [quantity, setQuantity] = useState(1);
  const [randomRating, setRandomRating] = useState(0);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const random = (Math.random() * 2 + 3).toFixed(1); // Between 3.0 and 5.0
    setRandomRating(parseFloat(random));
    setVotes(Math.floor(Math.random() * 1000 + 100)); // 100 - 1099
  }, []);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  const renderStars = (rating) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`${
            i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">
        {rating?.toFixed(1)} / 5.0 ({votes})
      </span>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-12 px-6 md:px-20 py-12 mt-20 mb-20">
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="text-sm text-gray-500 mb-4">
          {currentProduct.category || category} /{" "}
          <span className="text-[#17183B]">{currentProduct.name}</span>
        </div>

        <h2 className="text-3xl font-bold text-[#17183B]">
          {currentProduct.name}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#17183B] text-sm sm:text-base font-semibold">
            {currentProduct.width && (
              <span>
                <span className="text-gray-600">Width:</span>{" "}
                {currentProduct.width}
              </span>
            )}
            {currentProduct.thickness && (
              <span>
                <span className="text-gray-600">Thickness:</span>{" "}
                {currentProduct.thickness}
              </span>
            )}
            {currentProduct.length && (
              <span>
                <span className="text-gray-600">Length:</span>{" "}
                {currentProduct.length}
              </span>
            )}
            {currentProduct.id && (
              <span>
                <span className="text-gray-600">Item Code:</span>{" "}
                {currentProduct.id}
              </span>
            )}
          </div>

          <div className="flex items-center">{renderStars(randomRating)}</div>
        </div>

        <p className="text-gray-700 leading-relaxed max-w-md">
          {currentProduct.details}
        </p>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, parseInt(q) - 1))}
              className="px-3 py-2 text-[#264978]"
            >
              <FiMinus />
            </button>
            <input
              type="number"
              min="1"
              className="w-16 text-center text-lg border-x outline-none"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              onClick={() => setQuantity((q) => parseInt(q || 1) + 1)}
              className="px-3 py-2 text-[#264978]"
            >
              <FiPlus />
            </button>
          </div>
          <AddToCartButton product={{ ...currentProduct, quantity }} />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={currentProduct.img}
          alt={currentProduct.name}
          className="w-[600px] h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
