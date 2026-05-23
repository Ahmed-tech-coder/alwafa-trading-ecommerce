import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Admin = () => {
  const { token } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);

  const navigate = useNavigate();

  const handleNavigateToAddAdmin = () => {
    setTimeout(() => {
      navigate("/admin/add-admin");
    }, 1000);
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          "https://elwafastore.premiumasp.net/api/Account/GetAllAdmins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admins");
        }

        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        toast.error("Error fetching admins: " + error.message);
      }
    };

    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
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
        throw new Error("Failed to delete admin");
      }

      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
      toast.success("Admin deleted successfully");
    } catch (error) {
      toast.error("Error deleting admin: " + error.message);
    }
  };

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-8 bg-[#E9EFF9] min-h-screen mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.h1
          className="text-black text-2xl sm:text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Admin
        </motion.h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <motion.div
            className="relative text-[#264978] w-full sm:w-[300px]"
            whileFocus={{ scale: 1.05 }}
            whileHover={{ scale: 1.03 }}
          >
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-[#264978] font-semibold w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264978]"
              style={{ color: "#264978" }}
            />
          </motion.div>

          <motion.button
            onClick={handleNavigateToAddAdmin}
            className="bg-[#264978] text-white w-full sm:w-auto px-12 py-2 rounded-md font-semibold hover:bg-[#1f3d67]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Admin
          </motion.button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="overflow-x-auto rounded-md">
        <motion.table
          className="min-w-[700px] w-full border-collapse text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#264978",
                color: "white",
                fontSize: "18px",
              }}
            >
              <th className="py-3 px-4 border-r border-gray-300">ID</th>
              <th className="py-3 px-4 border-r border-gray-300">Name</th>
              <th className="py-3 px-4 border-r border-gray-300">Number</th>
              <th className="py-3 px-4 border-r border-gray-300">Email</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No admins found.
                </td>
              </tr>
            ) : (
              filteredAdmins.map((admin, idx) => (
                <motion.tr
                  key={admin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F0F4F8",
                  }}
                  className="text-[#000000]"
                >
                  <td className="py-3 px-4 border-r border-gray-300">
                    {admin.id}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {admin.userName}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {admin.phoneNumber}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {admin.email}
                  </td>

                  <td className="py-3 px-4">
                    <motion.button
                      onClick={() => handleDelete(admin.id)}
                      className="bg-[#D23403] text-white px-3 py-1 rounded-md hover:bg-[#a32902]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

export default Admin;
