
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

const Login = () => {
  const { token, setToken, navigate } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState('');
  const [passwords, showPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/api/auth/login';
    const body = { email, password, rememberMe };

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
        alert('Login successful');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('https://rogue0707.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])




  return (
    <div className=' flex w-[100vw] h-[100vh] '>



      <div className='w-[100%] m-auto  flex px-8  justify-center'>
        <div className='w-[400px]'>
          <div className='flex justify-center items-center'>
            <img src={assets.s4} alt="Logo" className="w-30 mix-blend-multiply opacity-40" />
          </div>
          {/* <div className='pt-2'>
            <p className='text-[#A9ABAE] text-sm'>Let's get started</p>
            <p className='text-[#A9ABAE] text-sm'>
              Your Journey Starts Here.
            </p>


          </div> */}


          <div className='text-[#A9ABAE]  text-sm font-medium pt-2 my-6'>
             <Link to="/signup" className='text-[#A9ABAE] rounded-full !border-none   bg-[#605B55] hover:bg-[#534f49]   py-1 px-2'>Register</Link>
          </div>
          <form onSubmit={handleSubmit} action="" id='frmLogin'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              autoComplete="off"
              
              className="border-b w-full login-input py-1 px-2 text-[#A9ABAE] placeholder-[#A9ABAE] text-sm outline-0"
              name="txtemail"
              id="txtemail"
              placeholder="Email"
            />




            <div className='flex relative '>

              <input value={password}
                onChange={(e) => setPassword(e.target.value)} autoComplete="off"
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



            <div className="flex justify-between items-center mt-3">
              <label className="flex items-center text-sm text-[#A9ABAE]">
                <input checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" className="mr-2  text-[#A9ABAE] cursor-pointer" />
                Remember Me
              </label>
              <Link onClick={handleForgotPassword} className="text-[#A9ABAE]  text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div>
              <button type='submit' className='w-full rounded-full !border-none   bg-[#605B55] hover:bg-[#534f49]   py-1 px-2 mt-3 text-[#D2D3D5] text-sm outline-0 cursor-pointer'> Login </button>
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

export default Login;





// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { assets } from "../assets/assets";

// const SHOPIFY_STORE_URL = "https://q3uepe-ic.myshopify.com";
// const SHOPIFY_ACCESS_TOKEN = "76df5b05e1b2db908234960f1757df67";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const query = `
//       mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
//         customerAccessTokenCreate(input: $input) {
//           customerAccessToken {
//             accessToken
//             expiresAt
//           }
//           customerUserErrors {
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       input: {
//         email,
//         password,
//       },
//     };

//     try {
//       const res = await fetch(`${SHOPIFY_STORE_URL}/api/2023-10/graphql.json`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
//         },
//         body: JSON.stringify({ query, variables }),
//       });

//       const json = await res.json();
//       const data = json?.data?.customerAccessTokenCreate;

//       if (data?.customerAccessToken) {
//         localStorage.setItem("shopify_token", data.customerAccessToken.accessToken);
//         alert("Login successful");
//         navigate("/");
//       } else {
//         alert(data?.customerUserErrors?.[0]?.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='w-[100%] m-auto  flex px-8  justify-center'>
//         <div className='w-[1000px]'>
//     <div
//       className="min-h-screen flex flex-col items-center  justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url('/assets/loginbg.jpg')` }}
//     >
//       <div className='flex justify-center items-center'>
//             <img src={assets.s4} alt="Logo" className="w-30 mix-blend-multiply opacity-40" />
//          </div>
//       <div className=" rounded-lg sm:w-[1000px] w-[320px] max-w-sm text-[#D2D3D5]">
//         <div className=" mb-3">
//           <Link
//             to="/signup"
//             className="text-sm px-4 py-1 bg-[#605B55] hover:bg-[#534f49] rounded-full"
//           >
//             REGISTER
//           </Link>
//         </div>

//         <form onSubmit={handleLogin}>
          
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full bg-transparent border-b text-[#A9ABAE] placeholder-[#A9ABAE] py-2 text-sm outline-none mb-3"
//             placeholder="Email"
//           />

         
//           <div className="relative mb-4">
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-transparent border-b text-[#A9ABAE] placeholder-[#A9ABAE] py-2 text-sm outline-none pr-8"
//               placeholder="PASSWORD"
//             />
//             <span
//               className="absolute right-2 top-2 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <FaEye className="text-[#A9ABAE]" />
//               ) : (
//                 <FaEyeSlash className="text-[#A9ABAE]" />
//               )}
//             </span>
//           </div>

//           <div className="flex justify-between items-center text-xs mb-5">
//             <label className="flex items-center space-x-1">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="accent-[#605B55]"
//               />
//               <span>REMEMBER ME</span>
//             </label>
//             <Link
//               to="/forgot-password"
//               className="text-[#A9ABAE] hover:underline"
//             >
//               FORGOT PASSWORD?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#605B55] hover:bg-[#534f49] text-sm py-2 rounded-full tracking-wide"
//           >
//             {loading ? "Logging in..." : "LOGIN"}
//           </button>
//         </form>
//       </div>
//       </div>
//       </div>
//       <div className='sm:px-10 px-0 fixed top-15 right-5 z-50'>
//         <Link to="/products" className='flex items-center justify-center text-[#A9ABAE] hover:underline text-sm'>
//           <IoIosArrowRoundBack className='text-xl cursor-pointer' />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;

