
// import React, { useContext, useEffect } from 'react'
// import { useState } from 'react'
// import loginimg from '../assets/login.jpg'
// import googleImg from '../assets/google.png'
// import { assets } from '../assets/assets'
// import { Link } from 'react-router-dom'
// import { FaEyeSlash } from "react-icons/fa";
// import { FaEye } from "react-icons/fa";
// import { ShopContext } from '../Context/ShopContext'
// import { IoIosArrowRoundBack } from "react-icons/io";

// const Signup = () => {
//   const {token,setToken,navigate}=  useContext(ShopContext);
//   const [passwords, showPassword] = useState(false)
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url =  '/api/auth/register';
//     const body = { email, mobile, password };

//     try {
//       const response = await fetch(`https://rogue0707.com${url}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });
//       const data = await response.json();
//       console.log(data);
//       if (response.ok) {
//         setToken(data.token)
//         localStorage.setItem('token', data.token);
//         alert('Registration successful');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(()=>{
//     if (token) {
//      navigate('/login')
//     }
//    },[token])

//   return (
//     <div className=' flex w-[100vw] h-[100vh] '>

      

//       <div className='w-[100%] m-auto px-8  flex  justify-center'>
//         <div className='w-[400px]'>
//           <div className='flex justify-center items-center'>
//             <img src={assets.s4} alt="Logo" className="w-30  mix-blend-multiply opacity-40" />
//           </div>
//           {/* <div>
//             <p className='text-[#A9ABAE] text-sm'>Join Rogue!</p>
//             <p className='text-[#A9ABAE] text-sm'>
//               Unlock Your Potential – Join Us Today!
//             </p>

            

//           </div> */}
         

//           <div className='text-[#A9ABAE]  text-sm font-medium pt-2 my-6'>
//             <Link to="/login" className='text-[#A9ABAE] rounded-full !border-none   bg-[#605B55] hover:bg-[#534f49]   py-1 px-2 '>Login</Link>
//           </div>
//           <form onSubmit={handleSubmit} action="" id='frmLogin'>
//             <div>
//               <input   value={email}
//               onChange={(e) => setEmail(e.target.value.toLowerCase())} 
//               required   type="email" autoComplete="off" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"  title="Please enter a valid email address" className='border-b login-input w-full py-1 px-2 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0' name='txtemail' id='txtemail' placeholder='Email' />
//             </div>

//             <div>
//               <input value={mobile}
//                 onChange={(e) => setMobile(e.target.value)} autoComplete="off"
//                 required type="tel" className='border-b login-input w-full py-1 px-2 mt-5 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0'  pattern="^[6-9][0-9]{9}$"  title="Please enter a valid 10-digit phone number starting with 6-9" name='txtnum' id='txtnum' placeholder='Mobile' />
//             </div>

//             <div className='flex relative'>
//               <input  value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required type={passwords ? "text" : "password"} className='border-b login-input w-full py-1 px-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-sm outline-0  mt-5' name='txtpassword' id='txtpassword' placeholder='Password' />

//               <div
//                 className="absolute right-3 top-1/2 transform -translate-y-0/2 cursor-pointer"
//                 onClick={() => showPassword(!passwords)}
//               >
//                 {passwords ? (
//                   <FaEye className="text-[#A9ABAE]" />
//                 ) : (
//                   <FaEyeSlash className="text-[#A9ABAE]" />
//                 )}
//               </div>
//             </div>

//             <div className='flex relative'>
//               <input  value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required type={passwords ? "text" : "password"} className='border-b login-input w-full py-1 px-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-sm outline-0  mt-5' name='cpassword' id='cpassword' placeholder='Confirm Password' />

//               <div
//                 className="absolute right-3 top-1/2  transform -translate-y-0/2 cursor-pointer"
//                 onClick={() => showPassword(!passwords)}
//               >
//                 {passwords ? (
//                   <FaEye className="text-[#A9ABAE]" />
//                 ) : (
//                   <FaEyeSlash className="text-[#A9ABAE]" />
//                 )}
//               </div>
//             </div>

           
//             <div>
//               <button type='submit' className='w-full   rounded-full !border-none  bg-[#605B55] hover:bg-[#534f49]   py-1 px-2 mt-3 text-[#D2D3D5] text-sm outline-0 cursor-pointer'> Signin </button>
//             </div>
//           </form>
//         </div>
//       </div>
//        <div className='sm:px-10 px-0 fixed top-15 right-5 z-50'>
//         <Link to="/products" className='flex items-center justify-center text-[#A9ABAE] hover:underline text-sm cursor-pointer'>
//           <IoIosArrowRoundBack className='text-xl cursor-pointer' />
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Signup;






import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { assets } from '../assets/assets';

const Signup = () => {
  const navigate = useNavigate();
  const [passwords, showPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    const query = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          customerUserErrors {
            message
            field
          }
        }
      }
    `;

    const variables = {
      input: {
        email: form.email,
        password: form.password,
      },
    };

    try {
      const response = await fetch("https://q3uepe-ic.myshopify.com/api/2023-07/graphql.json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '76df5b05e1b2db908234960f1757df67',
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();
      const error = result.data?.customerCreate?.customerUserErrors?.[0]?.message;

      if (error) {
        alert(error);
        setMessage(` ${error}`);
      } else {
        alert("Registration successful");
        setMessage("Account created! You can now log in.");
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong");
    }
  };

  return (
    <div className='flex w-[100vw] h-[100vh]'>
      <div className='w-[100%] m-auto px-8 flex justify-center'>
        <div className='w-[400px]'>
          <div className='flex justify-center items-center'>
            <img src={assets.s4} alt="Logo" className="w-30 mix-blend-multiply opacity-40" />
          </div>

          <div className='text-[#A9ABAE] text-sm font-medium pt-2 my-6'>
            <Link to="/login" className='text-[#A9ABAE] rounded-full bg-[#605B55] hover:bg-[#534f49] py-1 px-2'>Login</Link>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              className='border-b login-input w-full py-1 px-2 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0 mt-5'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value.toLowerCase() })}
            />

            <div className='flex relative mt-5'>
              <input
                type={passwords ? 'text' : 'password'}
                placeholder="Password"
                required
                className='border-b login-input w-full py-1 px-2 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div className="absolute right-3 top-[20%] transform -translate-y-0/2 cursor-pointer" onClick={() => showPassword(!passwords)}>
                {passwords ? <FaEye className="text-[#A9ABAE]" /> : <FaEyeSlash className="text-[#A9ABAE]" />}
              </div>
            </div>

            <div className='flex relative mt-5'>
              <input
                type={passwords ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
                className='border-b login-input w-full py-1 px-2 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0'
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
              <div className="absolute right-3 top-[20%] transform -translate-y-0/2 cursor-pointer" onClick={() => showPassword(!passwords)}>
                {passwords ? <FaEye className="text-[#A9ABAE]" /> : <FaEyeSlash className="text-[#A9ABAE]" />}
              </div>
            </div>

            <button type="submit" className='w-full rounded-full bg-[#605B55] hover:bg-[#534f49] py-1 px-2 mt-3 text-[#D2D3D5] text-sm'> Sign Up </button>
          </form>
        </div>
      </div>

      <div className='sm:px-10 px-0 fixed top-15 right-5 z-50'>
        <Link to="/products" className='flex items-center justify-center text-[#A9ABAE] hover:underline text-sm'>
          <IoIosArrowRoundBack className='text-xl cursor-pointer' />
        </Link>
      </div>
    </div>
  );
};

export default Signup;

