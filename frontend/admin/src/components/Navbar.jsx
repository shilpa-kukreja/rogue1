import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-lg border-b border-gray-200">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          className="w-[max(12%,90px)] sm:w-[80px] h-auto transition-transform transform hover:scale-105"
          src={assets.s4}
          alt="Moody Logo"
        />
      </a>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-gray-800 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:bg-gray-900 hover:scale-105 shadow-md"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
