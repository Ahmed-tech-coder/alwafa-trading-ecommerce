import { useState, useEffect } from "react";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/companyIcon.png";
import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar2 = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { token, userName, userType } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const links = ["home", "services", "shop", "about"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (link) => {
    setMenuOpen(false);

    let path = "/";
    if (link === "home") path = "/";
    else path = `/${link}`;

    navigate(path);
    window.location.reload();
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-around transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg border-b border-[#023B8A]"
            : "bg-white shadow-sm"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Logo and Company Name */}
        <div
          className="cursor-pointer flex items-center gap-3"
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
        >
          <img src={companyLogo} alt="Company Logo" className="h-12" />
          <div className="flex flex-col leading-5">
            <span className="text-black text-sm font-semibold">
              شركة الوفاء للتجارة
            </span>
            <span className="text-black text-xs">Alwafa Trading Company</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-16 text-[#000] text-lg font-medium">
          {links.map((link) => (
            <span
              key={link}
              onClick={() => handleLinkClick(link)}
              className="cursor-pointer capitalize  hover:text-[#023B8A] transition-colors duration-300 pb-1"
            >
              {link}
            </span>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6 text-3xl text-[#000] relative">
          {token && userType == "User" ? (
            <div className="flex items-center space-x-4">
              <div
                className="w-9 h-9 rounded-full bg-[#023B8A] text-white flex items-center justify-center text-sm font-semibold"
                title={userName}
              >
                {userName?.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-base font-medium text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-base font-medium hover:text-[#023B8A] transition-colors"
            >
              Login
            </button>
          )}

          <button
            onClick={() => navigate("/cart")}
            aria-label="Go to Cart"
            className="relative"
          >
            <FiShoppingCart className="cursor-pointer hover:text-[#023B8A] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-[1px] rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Hamburger menu button - mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <div className="text-xl text-[#000] flex space-x-4 relative">
            {token && userType == "User" ? (
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full bg-[#023B8A] text-white flex items-center justify-center text-sm font-semibold"
                  title={userName}
                >
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-sm text-red-600 font-medium hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-[#023B8A] transition-colors"
              >
                Login
              </button>
            )}

            <button
              onClick={() => navigate("/cart")}
              aria-label="Go to Cart"
              className="relative"
            >
              <FiShoppingCart className="cursor-pointer hover:text-[#023B8A] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-[1px] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile menu with animation */}
        <div
          id="mobile-menu"
          className={`absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-6 space-y-6 md:hidden z-40
            transition-transform duration-300 ease-in-out
            ${
              menuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }
          `}
        >
          {links.map((link) => (
            <span
              key={link}
              onClick={() => handleLinkClick(link)}
              className="cursor-pointer capitalize text-lg font-medium hover:text-[#023B8A] transition-colors"
            >
              {link}
            </span>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
