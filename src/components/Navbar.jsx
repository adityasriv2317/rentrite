import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaFileContract, FaSignInAlt, FaUserPlus, FaChartPie, FaBars, FaTimes, FaFileAlt } from "react-icons/fa";

function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md flex justify-between items-center relative">
      {/* Logo with File Icon */}
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        <FaFileAlt className="text-white" />
        RentRite
      </Link>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6">
        <NavItem to="/" label="Home" icon={<FaHome />} />

        {user ? (
          <>
            <NavItem to="/dashboard" label="Dashboard" icon={<FaChartPie />} />
            <NavItem to="/agreements" label="Agreements" icon={<FaFileContract />} />
            <NavItem to="/profile" label="Profile" icon={<FaUser />} />
            <LogoutButton />
          </>
        ) : (
          <>
            <NavItem to="/login" label="Login" icon={<FaSignInAlt />} />
            <NavItem to="/register" label="Sign Up" icon={<FaUserPlus />} />
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-blue-700 md:hidden flex flex-col items-center gap-4 py-4 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <NavItem to="/" label="Home" icon={<FaHome />} onClick={() => setIsOpen(false)} />

            {user ? (
              <>
                <NavItem to="/dashboard" label="Dashboard" icon={<FaChartPie />} onClick={() => setIsOpen(false)} />
                <NavItem to="/agreements" label="Agreements" icon={<FaFileContract />} onClick={() => setIsOpen(false)} />
                <NavItem to="/profile" label="Profile" icon={<FaUser />} onClick={() => setIsOpen(false)} />
                <LogoutButton />
              </>
            ) : (
              <>
                <NavItem to="/login" label="Login" icon={<FaSignInAlt />} onClick={() => setIsOpen(false)} />
                <NavItem to="/register" label="Sign Up" icon={<FaUserPlus />} onClick={() => setIsOpen(false)} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Reusable Nav Item with animations
function NavItem({ to, label, icon, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="relative" onClick={onClick}>
      <Link to={to} className="flex items-center gap-2 font-medium relative px-3 py-1">
        {icon} {label}
      </Link>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default Navbar;
