import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const CurrencyPopup = ({ onClose }) => {
  const { currency, setCurrency } = useContext(ShopContext);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const currencies = [
    { label: "US Dollar", value: "USD" },
    { label: "Canadian Dollar", value: "CAD" },
    { label: "Australian Dollar", value: "AUD" },
    { label: "Pound", value: "GBP" },
    { label: "Euro", value: "EUR" },
    { label: "Yen", value: "JPY" },
    { label: "Indian Rupee", value: "INR" },
  ];

  const handleConfirm = () => {
    setCurrency(selectedCurrency);
    sessionStorage.setItem("currencyPopupShown", "true"); // ✅ Save flag in session
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#605B55] text-[#D2D3D5] font-andale px-6 py-6 rounded-2xl shadow-xl w-[300px] text-center">
        <h2 className="text-[14px] mb-4 tracking-wide">
          Choose Your Currency
        </h2>

        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="w-full text-[10px] bg-[#605B55] text-[#D2D3D5] rounded-md border border-[#D2D3D5]/30 px-3 py-2 outline-none"
        >
          {currencies.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleConfirm}
          className="mt-5 bg-[#D2D3D5] text-[#605B55] text-[10px] font-andale px-4 py-2 rounded-full hover:bg-[#bcbcbc] transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CurrencyPopup;
