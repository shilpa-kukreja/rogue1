import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import { BsBagPlus } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, setToken } = useContext(ShopContext)
  const location = useLocation();
  const navigate = useNavigate();


  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className=" flex group   h-[16vh] flex-row  justify-between px-10 py-6 sticky top-0 z-[9] ">
      <div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <RxCross2 className="text-lg text-[#A9ABAE] cursor-pointer" />
          ) : (
            <FiMenu className="text-lg text-[#A9ABAE] cursor-pointer" />
          )}
        </button>


        {menuOpen && (
          <div className="mt-6 z-50 sm:space-y-3 space-y-2 flex flex-col cursor-pointer">
            {[
              { name: "HOME", path: "/" },
              { name: "ABOUT US", path: "/about" },
              { name: "CONTACT US", path: "/contact" },
              { name: "R 001 ", path: "/products" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="bg-[#605B55] text-[#D2D3D5] cursor-pointer font-andale text-[9px] sm:text-[10px]  px-6 text-center py-1 rounded-full"
              >
                {item.name}
              </Link>
            ))}

            {/* Show LOGIN only if not logged in */}
            {!token && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-[#605B55] text-[#D2D3D5] cursor-pointer font-andale text-[9px] sm:text-[10px] px-6 text-center py-1 rounded-full"
              >
                LOGIN
              </Link>
            )}

            {/* Show LOGOUT only if logged in */}
            {token && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-[#605B55] text-[#D2D3D5] cursor-pointer font-andale text-[9px] sm:text-[10px] px-6 text-center py-1 rounded-full"
              >
                LOGOUT
              </button>
            )}
          </div>
        )}
      </div>

      <>
        {location.pathname !== "/" && (
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-[#A9ABAE] hover:underline text-sm cursor-pointer flex items-center"
            >
              <IoIosArrowRoundBack className="text-xl" />
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default Navbar;
