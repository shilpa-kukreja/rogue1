import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../component/Sidebar';

const Footer = () => {
  return (
    <>
      {/* Desktop and tablet footer */}
      <div className='hidden sm:flex px-10 py-10 justify-center gap-2 flex-wrap relative'>
        {/* Policy Links */}
        {[
          { name: "SHIPPING", path: "/shipping" },
          { name: "RETURN POLICY", path: "/return-policy" },
          { name: "PRIVACY POLICY", path: "/privacy-policy" },
          { name: "TERMS", path: "/terms" },
          { name: "PRE-ORDER POLICY", path: "/preorder-policy" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="cursor-pointer font-andale bg-[#605B55] text-[#D2D3D5] text-[8px] px-6 text-center py-1 rounded-full"
          >
            {item.name}
          </Link>
        ))}

        {/* Login/Signup links */}
        <div className='absolute right-4 gap-1 flex'>
          {[
            { name: "LOGIN", path: "/login" },
            { name: "/ SIGNUP", path: "/signup" }
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="cursor-pointer font-andale text-[11px] text-[#A9ABAE] text-center"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Show Sidebar instead of Footer on small screens */}
      <div className='block  sm:hidden'>
        <Sidebar isMobile={true} />
      </div>
    </>
  );
};

export default Footer;
