import React, { useEffect, useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingIds, setLoadingIds] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchOrders = () => {
    axios
      .get("https://elwafastore.premiumasp.net/api/Cart/GetDashBoardCarts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load requests");
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirm = async (cartId) => {
    setLoadingIds((prev) => [...prev, cartId]);
    try {
      await axios.post(
        `https://elwafastore.premiumasp.net/api/Cart/ConfirmCart?CartId=${cartId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("The request has been successfully confirmed.");
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to confirm request");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== cartId));
    }
  };

  const handleCancel = async (cartId) => {
    setLoadingIds((prev) => [...prev, cartId]);
    try {
      await axios.post(
        `https://elwafastore.premiumasp.net/api/Cart/CancelCart?CartId=${cartId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );
      toast.success("The request was successfully cancelled");
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel the request");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== cartId));
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.applicationUserId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <ToastContainer />

      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8 gap-4 mt-32">
        <h1 className="text-black text-3xl font-bold">Orders</h1>
        <div className="relative text-[#264978] sm:w-72 sm:mx-auto">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder:text-[#264978] font-semibold px-12 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978] w-full"
            style={{ color: "#264978" }}
          />
        </div>
      </div>

      {/* Orders Cards */}
      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-xl p-4 shadow-md"
          >
            {/* Card Header */}
            <div className="flex justify-between mb-4 text-[#264978] font-semibold">
              <p>Cart ID: {order.id}</p>
              <p>User ID: {order.applicationUserId}</p>
            </div>

            {/* Product Info */}
            {order.cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-inner"
              >
                <img
                  src={item.productPictureUrl}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[#264978]">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleCancel(order.id)}
                    disabled={loadingIds.includes(order.id)}
                    className={`${
                      loadingIds.includes(order.id)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition`}
                  >
                    {loadingIds.includes(order.id) ? "..." : "Delete"}
                  </button>
                  <button
                    onClick={() => handleConfirm(order.id)}
                    disabled={loadingIds.includes(order.id)}
                    className={`${
                      loadingIds.includes(order.id)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition`}
                  >
                    {loadingIds.includes(order.id) ? "..." : "Confirm"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
