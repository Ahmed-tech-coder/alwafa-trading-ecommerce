import { NavLink, Outlet, useNavigate } from "react-router-dom";
import companyLogo from "../assets/companyIcon.png";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Menu, X, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Products", path: "/admin/product" },
  { label: "Services", path: "/admin/services" },
  { label: "Admins", path: "/admin/admin" },
  { label: "Users", path: "/admin/users" },
  { label: "Orders", path: "/admin/orders" },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#E9EFF9]">
      {/* Sidebar */}
      <aside
        className={`bg-[#264978] p-4 transition-all duration-300 fixed lg:static z-50 h-full lg:h-auto w-72 flex flex-col justify-between ${
          sidebarOpen ? "left-0" : "-left-80"
        } lg:left-0`}
      >
        <div>
          <div className="flex justify-between items-center lg:block mb-6 lg:mb-24">
            <div className="flex flex-col items-center">
              <img
                src={companyLogo}
                alt="AlWafa Logo"
                className="w-16 h-16 mb-2"
              />
              <h1 className="text-white text-xl font-bold">ALWAFA</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="space-y-3">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md border text-center text-lg font-bold px-3 py-2  transition-colors duration-300 relative overflow-hidden ${
                    isActive
                      ? "bg-white text-[#264978] border-white"
                      : "text-white border-white hover:bg-white hover:text-[#264978]"
                  }`
                }
                style={{ border: "1px solid #FFFFFF" }}
              >
                {item.label}
                {/* Underline effect */}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1E40AF] transition-all duration-300"
                  style={{
                    width:
                      window.location.pathname === item.path ? "100%" : "0",
                  }}
                />
              </NavLink>
            ))}
          </nav>

          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-md px-4 py-2 mt-4 w-full"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 text-[#264978]"
      >
        <Menu size={32} />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto mt-20 lg:mt-0">
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
