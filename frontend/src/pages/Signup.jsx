
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import loginimg from '../assets/login.jpg'
import googleImg from '../assets/google.png'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { ShopContext } from '../Context/ShopContext'
import { IoIosArrowRoundBack } from "react-icons/io";

const Signup = () => {
  const {token,setToken,navigate}=  useContext(ShopContext);
  const [passwords, showPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =  '/api/auth/register';
    const body = { email, mobile, password };

    try {
      const response = await fetch(`https://rogue0707.com${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setToken(data.token)
        localStorage.setItem('token', data.token);
        alert('Registration successful');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    if (token) {
     navigate('/login')
    }
   },[token])

  return (
    <div className=' flex w-[100vw] h-[100vh] '>

      

      <div className='w-[100%] m-auto px-8  flex  justify-center'>
        <div className='w-[400px]'>
          <div className='flex justify-center items-center'>
            <img src={assets.s4} alt="Logo" className="w-30  mix-blend-multiply opacity-40" />
          </div>
          {/* <div>
            <p className='text-[#A9ABAE] text-sm'>Join Rogue!</p>
            <p className='text-[#A9ABAE] text-sm'>
              Unlock Your Potential – Join Us Today!
            </p>

            

          </div> */}
         

          <div className='text-[#A9ABAE]  text-sm font-medium pt-2 my-6'>
            <Link to="/login" className='text-[#A9ABAE] rounded-full !border-none   bg-[#605B55] hover:bg-[#534f49]   py-1 px-2 '>Login</Link>
          </div>
          <form onSubmit={handleSubmit} action="" id='frmLogin'>
            <div>
              <input   value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())} 
              required   type="email" autoComplete="off" className='border-b login-input w-full py-1 px-2 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0' name='txtemail' id='txtemail' placeholder='Email' />
            </div>

            <div>
              <input value={mobile}
                onChange={(e) => setMobile(e.target.value)} autoComplete="off"
                required type="tel" className='border-b login-input w-full py-1 px-2 mt-5 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0' name='txtnum' id='txtnum' placeholder='Mobile' />
            </div>

            <div className='flex relative'>
              <input  value={password}
              onChange={(e) => setPassword(e.target.value)}
              required type={passwords ? "text" : "password"} className='border-b login-input w-full py-1 px-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-sm outline-0  mt-5' name='txtpassword' id='txtpassword' placeholder='Password' />

              <div
                className="absolute right-3 top-1/2 transform -translate-y-0/2 cursor-pointer"
                onClick={() => showPassword(!passwords)}
              >
                {passwords ? (
                  <FaEye className="text-[#A9ABAE]" />
                ) : (
                  <FaEyeSlash className="text-[#A9ABAE]" />
                )}
              </div>
            </div>

            <div className='flex relative'>
              <input  value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required type={passwords ? "text" : "password"} className='border-b login-input w-full py-1 px-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-sm outline-0  mt-5' name='cpassword' id='cpassword' placeholder='Confirm Password' />

              <div
                className="absolute right-3 top-1/2  transform -translate-y-0/2 cursor-pointer"
                onClick={() => showPassword(!passwords)}
              >
                {passwords ? (
                  <FaEye className="text-[#A9ABAE]" />
                ) : (
                  <FaEyeSlash className="text-[#A9ABAE]" />
                )}
              </div>
            </div>

           
            <div>
              <button type='submit' className='w-full   rounded-full !border-none  bg-[#605B55] hover:bg-[#534f49]   py-1 px-2 mt-3 text-[#D2D3D5] text-sm outline-0 cursor-pointer'> Signin </button>
            </div>
          </form>
        </div>
      </div>
       <div className='sm:px-10 px-0 fixed top-15 right-5 z-50'>
        <Link to="/products" className='flex items-center justify-center text-[#A9ABAE] hover:underline text-sm cursor-pointer'>
          <IoIosArrowRoundBack className='text-xl cursor-pointer' />
        </Link>
      </div>
    </div>
  )
}

export default Signup;
