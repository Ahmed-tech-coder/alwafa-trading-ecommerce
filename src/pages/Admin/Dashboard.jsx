import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msgLoading, setMsgLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msgError, setMsgError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("No authorization token found.");
      setLoading(false);
      return;
    }

    // Fetch dashboard data
    fetch("https://elwafastore.premiumasp.net/api/DashBoard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Fetch contact messages
    fetch("https://elwafastore.premiumasp.net/api/Contact/GetAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setContactMessages(json);
        setMsgLoading(false);
      })
      .catch((err) => {
        setMsgError(err.message);
        setMsgLoading(false);
      });
  }, [token]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    fetch(`https://elwafastore.premiumasp.net/api/Contact?Id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to delete message: ${res.status}`);
        setContactMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== id)
        );
      })
      .catch((err) => {
        alert("Error deleting message: " + err.message);
      });
  };

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  const stats = [
    { title: "Number of Products", value: data.numOfProduct },
    { title: "Number of Services", value: data.numOfServices },
    { title: "Total Sales", value: data.totalSales },
    { title: "Number of Users", value: data.numOfUsers },
    { title: "Number of Admins", value: data.numOfAdmin },
  ];

  return (
    <div className="p-8 bg-[#E9EFF9] min-h-screen">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-8 justify-center mb-16">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white w-48 h-36 rounded-2xl flex flex-col justify-center items-center shadow-lg"
          >
            <h2 className="text-[#264978] text-xl font-semibold mb-3 text-center">
              {stat.title}
            </h2>
            <p className="text-[#BF1E2E] text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Contact Messages Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#264978] mb-6 text-center">
          User Messages
        </h2>

        {msgLoading ? (
          <p className="text-center">Loading messages...</p>
        ) : msgError ? (
          <p className="text-center text-red-500">{msgError}</p>
        ) : contactMessages.length === 0 ? (
          <p className="text-center text-gray-500">No messages found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200">
              <thead>
                <tr className="bg-[#264978] text-white">
                  <th className="py-3 border">#</th>
                  <th className="py-3 border">User Name</th>
                  <th className="py-3 px-16 border">Message</th>
                  <th className="py-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {contactMessages.map((msg, index) => (
                  <tr key={msg.id} className="text-center hover:bg-gray-100">
                    <td className="py-2  border">{index + 1}</td>
                    <td className="py-2 border">{msg.userName}</td>
                    <td className="py-2 px-16 border">{msg.message}</td>
                    <td className="py-2 border">
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="bg-[red] py-2 px-3 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
