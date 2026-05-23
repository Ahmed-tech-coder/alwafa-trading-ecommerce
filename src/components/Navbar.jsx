import { FiUser, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/companyIcon.png";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm relative">
            <div className="cursor-pointer" onClick={() => navigate("/")}>
                <img src={companyLogo} alt="Company Logo" className="h-10" />
            </div>
            <div className="flex items-center space-x-6 text-[#264978] text-xl">
                <FiUser
                    className="cursor-pointer"
                    style={{ color: "#000" }}
                />
                <FiShoppingCart
                    className="cursor-pointer"
                    style={{ color: "#000" }}
                />
            </div>
            <div className="border-b-2 border-[#023B8A] w-full absolute bottom-0 left-0" />
        </nav>
    );
};

export default Navbar;
