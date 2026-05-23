import React, { useState, useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const AddToCartButton = ({ product, onAdd }) => {
  const { addToCart } = useCart();
  const { token } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;

    if (onAdd) onAdd();

    const itemToAdd = {
      id: product.itemCode,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: product.quantity || 1,
    };

    try {
      const response = await fetch(
        "https://elwafastore.premiumasp.net/api/Cart/AddToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product.itemCode,
            quantity: itemToAdd.quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart on server");
      }

      addToCart(itemToAdd);

      setClicked(true);
      setTimeout(() => setClicked(false), 300);

      toast.success(`"${product.name}" added to cart!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed to add product to cart. Please try again.");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center gap-2 bg-[#3AA39F] hover:bg-[#2b837f] text-white px-6 py-2 rounded-lg shadow-md transition
        ${clicked ? "animate-pulse" : ""}
        `}
      aria-label={`Add ${product?.name || "product"} to cart`}
    >
      <FiShoppingCart
        className={`transition-transform duration-300 ${
          clicked ? "translate-x-1 -translate-y-1" : ""
        }`}
        size={20}
      />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
