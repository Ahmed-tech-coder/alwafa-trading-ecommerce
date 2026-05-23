import React, { useContext } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const { id: userId } = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const shipping = "Free";

  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(
        `https://elwafastore.premiumasp.net/api/Cart/RemoveFromCart?userId=${userId}&ProductId=${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to remove item");

      removeItem(productId);
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error(error);
      toast.error("Could not remove item.");
    }
  };

  const handleGoToWhatsapp = async () => {
    try {
      const res = await fetch(
        `https://elwafastore.premiumasp.net/api/Cart/GoToWhatsApp?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("WhatsApp redirection failed");

      toast.success("Redirecting to WhatsApp...");
      window.open(
        "https://wa.me/+97466230548?text=I%20want%20to%20order%20from%20your%20shop",
        "_blank"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate WhatsApp order.");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto my-8 px-4 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12 mt-24">
        <div className="flex-1">
          <h1 className="text-3xl font-light text-[#17183B] mb-4">
            Cart &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#A2A3B1] font-light text-xl">
              {cartItems.length} ITEMS
            </span>
          </h1>

          <div className="flex flex-col gap-6 mt-6">
            {cartItems.length === 0 && (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )}

            <AnimatePresence>
              {cartItems.map(({ id, name, category, quantity, img }, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0">
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                      <img
                        src={img}
                        alt={name}
                        className="w-full max-w-[160px] h-auto rounded-md object-cover"
                      />
                      <div className="space-y-3 flex-1">
                        <p className="text-sm text-gray-500">{category}</p>
                        <h3 className="font-semibold text-lg text-[#17183B]">
                          {name}
                        </h3>

                        <div className="flex items-center gap-4 mt-1 flex-wrap">
                          <div className="flex items-center border rounded-md overflow-hidden px-4 py-1">
                            <button
                              onClick={() => updateQuantity(id, -1)}
                              className="px-2 py-1 text-[#264978] disabled:text-gray-400"
                              disabled={quantity <= 1}
                              aria-label={`Decrease quantity of ${name}`}
                            >
                              <FiMinus />
                            </button>
                            <span
                              className="px-4 text-lg select-none"
                              aria-live="polite"
                              aria-atomic="true"
                            >
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(id, 1)}
                              className="px-2 py-1 text-[#264978]"
                              aria-label={`Increase quantity of ${name}`}
                            >
                              <FiPlus />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(id)}
                            className="text-red-600 font-semibold whitespace-nowrap"
                            aria-label={`Remove ${name} from cart`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < cartItems.length - 1 && (
                    <hr className="my-6 border-t border-gray-300" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="w-full md:w-96 border border-gray-300 rounded-md p-6 flex flex-col gap-4 shadow-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-[#17183B]">Order Summary</h2>

          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>{shipping}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-semibold text-lg text-[#17183B]">
            <span>Estimated Delivery by</span>
            <span className="font-light">01 Feb, 2025</span>
          </div>

          <button
            className="mt-6 w-full py-3 rounded-md text-white font-semibold"
            style={{ backgroundColor: "#00AF0C" }}
            onClick={handleGoToWhatsapp}
            aria-label="Go to Whatsapp to place order"
          >
            Go To Whatsapp
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default Cart;
