import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Users = () => {
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://elwafastore.premiumasp.net/api/Account/GetAllUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        toast.error("Error fetching users: " + error.message);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://elwafastore.premiumasp.net/api/Account/DeleteUser?Id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user: " + error.message);
    }
  };

  useEffect(() => {
    if (searchTerm && filteredUsers.length === 0) {
      toast("No users found for your search.", {
        icon: "🔍",
        duration: 4000,
      });
    }
  }, [searchTerm, filteredUsers.length]);

  return (
    <div className="p-6 sm:p-8 bg-[#E9EFF9] min-h-screen mt-20">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-black text-3xl font-bold">Users</h1>
        <div className="relative text-[#264978] sm:w-72 sm:mx-auto">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder:text-[#264978] font-semibold px-12 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978] w-54"
            style={{ color: "#264978" }}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse text-center min-w-[600px]">
          <thead>
            <tr
              style={{
                backgroundColor: "#264978",
                color: "white",
                fontSize: "20px",
              }}
            >
              <th className="py-3 px-4 border-r border-gray-300">ID</th>
              <th className="py-3 px-4 border-r border-gray-300">First Name</th>
              <th className="py-3 px-4 border-r border-gray-300">Last Name</th>
              <th className="py-3 px-4 border-r border-gray-300">User Name</th>
              <th className="py-3 px-4 border-r border-gray-300">Number</th>
              <th className="py-3 px-4 border-r border-gray-300">Email</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredUsers.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </motion.tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#FFFFFF99",
                    }}
                    className="text-[#000000]"
                  >
                    <td className="py-3 px-4 border-r border-gray-300">
                      {user.id}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {user.firstName}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {user.lastName}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {user.userName}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {user.phoneNumber}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-[#D23403] text-white px-3 py-1 rounded-md hover:bg-[#a32902]"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
