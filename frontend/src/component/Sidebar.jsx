import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { ShopContext } from '../Context/ShopContext';

const Sidebar = ({ isMobile = false }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const navigate = useNavigate();
  const { currency, setCurrency } = useContext(ShopContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    setShowCurrencyDropdown(false);
  };

  const currencies = [
    { label: "US Dollar", value: "USD" },
    { label: "Canadian Dollar", value: "CAD" },
    { label: "Australian Dollar", value: "AUD" },
    { label: "Pound", value: "GBP" },
    { label: "Euro", value: "EUR" },
    { label: "Yen", value: "JPY" },
    { label: "Indian Rupee", value: "INR" },
  ];

  return (
    <div
      className={`${
        isMobile
          ? 'flex flex-row justify-center gap-4 py-4'
          : 'w-[40px] min-h-screen p-4 fixed left-8 z-50 top-10  items-center justify-center hidden sm:flex'
      }`}
    >
      <ul className={`${isMobile ? 'flex gap-2' : 'space-y-6 text-center'} `}>
        <li>
          <Link
            to="/cart"
            className="block font-andale bg-[#605B55] text-[#D2D3D5] text-[8px] px-2 py-1 rounded-full"
            style={isMobile ? {} : { transform: 'rotate(270deg)' }}
          >
            BAG
          </Link>
        </li>

        <li>
          <div
            onClick={() => setShowSearch(!showSearch)}
            className="flex justify-center items-center font-andale bg-[#605B55] text-[#D2D3D5] text-[8px] px-2 py-1 rounded-full cursor-pointer"
            style={isMobile ? {} : { transform: "rotate(270deg)" }}
          >
            <FiSearch size={12} />
          </div>
        </li>

        <li>
          <div
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="block font-andale bg-[#605B55] text-[#D2D3D5] text-[8px] px-2 py-1 rounded-full cursor-pointer"
            style={isMobile ? {} : { transform: 'rotate(270deg)' }}
          >
            {currency}
          </div>
        </li>

        <li>
          <Link
            to="/products"
            className="block font-andale bg-[#605B55] text-[#D2D3D5] text-[8px] px-2 py-1 rounded-full"
            style={isMobile ? {} : { transform: 'rotate(270deg)' }}
          >
           R&nbsp;001 
          </Link>
        </li>
      </ul>

      {/* search */}
      {showSearch && (
        <form
          onSubmit={handleSearchSubmit}
          className={`absolute ${isMobile ? 'bottom-16' : 'top-25 left-12'} bg-[#605B55] text-[#D2D3D5] text-[10px] rounded-md px-2 py-1 z-50 shadow-lg`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-[10px]"
          />
        </form>
      )}

      {/* currency dropdown */}
      {showCurrencyDropdown && (
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className={`absolute ${isMobile ? 'bottom-16' : 'top-24 left-12'} z-50 outline-none text-[10px] bg-[#605B55] text-[#D2D3D5] rounded-md shadow-md px-2 py-1`}
        >
          {currencies.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Sidebar;
