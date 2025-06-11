import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import About from './pages/About'
import Product from './pages/Product'
import Contact from './pages/Contact'
import { assets } from './assets/assets'
import ProductDetails from './pages/ProductDetail'
import Footer from './pages/Footer'
import { useLocation } from 'react-router-dom'
import Error from './component/Error'
import Career from './component/Career'
import rougemp4video from './assets/rougemp4video.mp4';

import Terms from './component/Terms'
import Shipping from './component/Shipping'
import PreOrderTerms from './component/PreOrderTerms'
import PrivacyPolicy from './component/PrivacyPolicy'
import ReturnPolicy from './component/ReturnPolicy'
import StockLists from './component/StockLists'
import Login from './pages/Login'
import CheckOut from './component/CheckOut'
import Cart from './component/Cart'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { PiSpeakerSimpleNoneDuotone } from "react-icons/pi";
import { PiSpeakerSimpleSlashDuotone } from "react-icons/pi";
import bgVideo from './assets/bachgroundVidoe.mp4'
import { useState, useRef } from 'react'
import Orders from './pages/Orders'
import Sidebar from './component/Sidebar'
import SearchResults from './pages/SearchResults'
import PreOrderPolicy from './component/PreOrderPolicy'
import { getBrowser } from './pages/BrowserDetector'







const App = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login';
  const isSignUp = location.pathname === '/signup'
  const isForgotPassword = location.pathname === '/forgot-password'
  const isHomePage = location.pathname === "/";
  const isCheckOut = location.pathname === "/checkout";
  const isOrder = location.pathname === "/orders";
  const isCart = location.pathname === "/checkout";

  const [Muted, setIsMuted] = useState(true);
  const [browser, setBrowser] = useState('');
  const videoRef = useRef(null);


  useEffect(() => {
    const detected = getBrowser();
    console.log("Detected Browser:", detected);
    setBrowser(detected);
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };;


  return (
    <div className="relative w-full h-full">

      {/* <div 
     style={{
      backgroundImage: `    url(${assets.bgImg})    `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      backgroundAttachment:'fixed',
      // height: "100vh",
    }}> */}


      {isHomePage ? (
        <>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            {browser === 'Safari' ? (
              <source src={rougemp4video} type="video/mp4" />
            ) : (
              <source src={bgVideo} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>

          <button
            onClick={toggleAudio}
            className="absolute top-10 transform -translate-y-1/2 z-[100] text-[#A9ABAE] cursor-pointer font-andale rounded-full text-[18px] tracking-wide right-10"
          >
            {Muted ? <PiSpeakerSimpleSlashDuotone /> : <PiSpeakerSimpleNoneDuotone />}
          </button>
        </>

      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full min-h-[100vh] bg-cover bg-center z-[-1]"
          style={{ backgroundImage: `url(${assets.bgImg})`, backgroundAttachment: "fixed" }}
        />

      )}
      {!isLoginPage && !isSignUp && !isForgotPassword && !isHomePage && !isCheckOut && !isOrder && <Sidebar />}


      <div>

      </div>







      {/* <Navbar  /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // OR 'light' — avoid 'dark'
      />
      {!isLoginPage && !isSignUp && !isForgotPassword && <Navbar />}


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Product />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/stocklists' element={<StockLists />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/preOrderTerms' element={<PreOrderTerms />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/preorder-policy' element={<PreOrderPolicy />} />
        <Route path='/career' element={<Career />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='*' element={<Error />} />
      </Routes>

      {!isLoginPage && !isHomePage && !isSignUp && !isForgotPassword && !isCart && <Footer />}

    </div>
  )
}

export default App;
