// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { assets } from '../assets/assets';
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Link } from "react-router-dom";
// // import DealTimer from '../component/DealTimer';
// // import DealTimer from '../component/DealTimer';


// const Product = () => {


//   const { products } = useContext(ShopContext)
//   const [showProduct, setShowProduct] = useState([])

//   useEffect(() => {
//     if (products) {
//       setShowProduct(products);
//     }
//   }, [products])

//   console.log(products)
//    const handleDealEnd = () => {
//     setDealOver(true);
//   };
//   return (
//     <>
  
//      <DealTimer onDealEnd={handleDealEnd}/> 
      
//      <div className='sm:max-w-[680px]    md:max-w-[700px]   lg:max-w-[1024px]  2xl:max-w-[1600px] h-[75vh] items-center justify-center mx-auto'>

     
//       {/* <h2 className='uppercase  pb-3  text-[#d2d3d4] text-2xl  text-center'>Rouge</h2> */}
   

//       {/* slider code  */}
//        <div className='h-[65vh] flex justify-center mt-5 items-center'>
//       <Swiper
//         slidesPerView={6}
//         spaceBetween={10}
        
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//         modules={[ Pagination, Autoplay]}
//         breakpoints={{
//           320: { slidesPerView: 2 },
//           640: { slidesPerView: 3 },
//           768: { slidesPerView: 4 },
//           1024: { slidesPerView: 5 },
//         }}
//         className="mySwiper w-full  flex items-center justify-center"
//       >
//         {showProduct.map((product, index) => (
//   <SwiperSlide key={product._id || index} className="cursor-pointer flex justify-center items-center">
//     <Link to={`/product/${product._id}`}>
//       {product.variants?.length > 0 && product.variants[0]?.images?.length > 0 ? (
//         <img
//           src={`https://rogue0707.com${product.variants[0].images[0]}`}

//           alt={product.name}
//           className=" 2xl:h-[500px]  flex justify-center  sm:h-[100%] lg:h-[400px] h-[450px]   "
//         />
//       ) : (
//         <img
//           src="https://via.placeholder.com/150" // Fallback image
//           alt="No Image Available"
//           className="object-cover  w-50"
//         />
//       )}
//     </Link>
//   </SwiperSlide>
// ))}

//       </Swiper>
//       </div>






//       {/* show logo in center  */}



//       <div className="fixed inset-0 opacity-50 flex justify-center items-center pointer-events-none z-10 ">
//         <img
//           src={assets.s4}
//           alt="Logo"
//           className="w-50 mix-blend-multiply"
//         />
//       </div>







//       {/* all information page  */}

//       {/* <div className='px-10 fixed top-15 left-28'>
//                  <button className='p-2 border  text-xs cursor-pointer'>info</button>
//                    <div className='grid'>
//                     <Link className='text-xs underline  text-[#d2d2d4]'  to="/contact">contact</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/shipping">shipping</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/return-policy">return policy</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/privacy-policy">privacy policy</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/terms">terms</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/preOrderTerms">pre-order terms</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="stocklists">stocklists</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="newsletter">newsletter</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="career">careers</Link>
//                    </div>
//                </div> */}

      
//       </div>
//     </>
//   )
// }

// export default Product












// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { assets } from '../assets/assets';
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Link } from "react-router-dom";
// import DealTimer from '../component/DealTimer';
// import DealTimer from '../component/DealTimer';


// const Product = () => {


//   const {products , timerExpire} = useContext(ShopContext)
//   const [showProduct, setShowProduct] = useState([])
//   // const [dealOver, setDealOver] = useState(false);

//   useEffect(() => {
//     if (products) {
//       setShowProduct(products);
//     }
//   }, [products])

//   console.log(products)


//   //  const handleDealEnd = () => {
//   //   setDealOver(true);
//   // };
//   return (
//     <>
  
//      {/* <DealTimer onDealEnd={handleDealEnd}/> */}


//      {/* {timerExpire && ( */}
//      <div className='sm:max-w-[680px]   md:max-w-[700px]   lg:max-w-[1024px]  2xl:max-w-[1600px] h-[75vh] items-center justify-center mx-auto'>

     
//       {/* <h2 className='uppercase  pb-3  text-[#d2d3d4] text-2xl  text-center'>Rouge</h2> */}
   

//       {/* slider code  */}
//        <div className='h-[65vh] flex justify-center mt-5 items-center'>
//       <Swiper
//         slidesPerView={6}
//         spaceBetween={10}
        
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//         modules={[ Pagination, Autoplay]}
//         breakpoints={{
//           320: { slidesPerView: 2 },
//           640: { slidesPerView: 3 },
//           768: { slidesPerView: 4 },
//           1024: { slidesPerView: 5 },
//         }}
//         className="mySwiper w-full  flex items-center justify-center"
//       >
//         {showProduct.map((product, index) => (
//   <SwiperSlide key={product._id || index} className="cursor-pointer flex justify-center items-center">
//     <Link to={`/product/${product._id}`}>
//       {product.variants?.length > 0 && product.variants[0]?.images?.length > 0 ? (
//         <img
//           src={`https://rogue0707.com${product.variants[0].images[0]}`}

//           alt={product.name}
//           className=" 2xl:h-[500px]  flex justify-center  sm:h-[100%] lg:h-[400px] h-[450px]   "
//         />
//       ) : (
//         <img
//           src="https://via.placeholder.com/150" // Fallback image
//           alt="No Image Available"
//           className="object-cover  w-50"
//         />
//       )}
//     </Link>
//   </SwiperSlide>
// ))}

//       </Swiper>
//       </div>






//       {/* show logo in center  */}



//       <div className="fixed inset-0 opacity-50 flex justify-center items-center pointer-events-none z-10 ">
//         <img
//           src={assets.s4}
//           alt="Logo"
//           className="w-50 mix-blend-multiply"
//         />
//       </div>







//       {/* all information page  */}

//       {/* <div className='px-10 fixed top-15 left-28'>
//                  <button className='p-2 border  text-xs cursor-pointer'>info</button>
//                    <div className='grid'>
//                     <Link className='text-xs underline  text-[#d2d2d4]'  to="/contact">contact</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/shipping">shipping</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/return-policy">return policy</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/privacy-policy">privacy policy</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/terms">terms</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="/preOrderTerms">pre-order terms</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="stocklists">stocklists</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="newsletter">newsletter</Link>
//                     <Link className='text-xs text-[#d2d2d4]' to="career">careers</Link>
//                    </div>
//                </div> */}

      
//       </div>
//       {/* )} */}
//     </>
//   )
// }

// export default Product



// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../Context/ShopContext';
// import { assets } from '../assets/assets';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Link } from "react-router-dom";
// import DealTimer from '../component/DealTimer';

// const Product = () => {
//   const { products, timerExpire } = useContext(ShopContext);
//   const [showProduct, setShowProduct] = useState([]);
//   const [dealOver, setDealOver] = useState(false);

//   useEffect(() => {
//     if (products?.length > 0) {
//       setShowProduct(products);
//     }
//   }, [products]);

//   const handleDealEnd = () => {
//     setDealOver(true);
//   };

//   return (
//     <>
//       <DealTimer onDealEnd={handleDealEnd} />

//       {timerExpire && (
//         <div className='sm:max-w-[680px] md:max-w-[700px] lg:max-w-[1024px] 2xl:max-w-[1600px] h-[75vh] items-center justify-center mx-auto'>
//           {/* Swiper Product Slider */}
//           <div className='h-[65vh] flex justify-center mt-5 items-center'>
//             <Swiper
//               slidesPerView={6}
//               spaceBetween={10}
//               pagination={{ clickable: true }}
//               autoplay={{ delay: 3000 }}
//               loop={true}
//               modules={[Pagination, Autoplay]}
//               breakpoints={{
//                 320: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 768: { slidesPerView: 4 },
//                 1024: { slidesPerView: 5 },
//               }}
//               className="mySwiper w-full flex items-center justify-center"
//             >
//               {showProduct.map((product, index) => {
//                 const imageCount = product.images?.edges?.length || 0;

//                 let imageIndex = 0;
//                 if (imageCount >= 36) imageIndex = 32;
//                 else if (imageCount >= 21) imageIndex = 16;
//                 else if (imageCount >= 10) imageIndex = 5;
//                 else imageIndex = 0;

//                 const mainImage = product.images?.edges?.[imageIndex]?.node?.url;
//                 const productId = product.id?.split("/").pop();

//                 return (
//                   <SwiperSlide key={product.id || index} className="cursor-pointer flex justify-center items-center">
//                     <Link to={`/product/${productId}`}>
//                       <img
//                         src={mainImage || "https://via.placeholder.com/150"}
//                         alt={product.title}
//                         className="2xl:h-[500px] sm:h-full lg:h-[400px] h-[450px] object-contain"
//                       />
//                     </Link>
//                   </SwiperSlide>
//                 );
//               })}

//             </Swiper>
//           </div>

//           {/* Overlay Logo */}
//           <div className="fixed inset-0 opacity-50 flex justify-center items-center pointer-events-none z-10">
//             <img
//               src={assets.s4}
//               alt="Logo"
//               className="w-50 mix-blend-multiply"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Product;






// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { assets } from "../assets/assets";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Link } from "react-router-dom";
// import DealTimer from "../component/DealTimer";

// import { ChevronLeft, ChevronRight } from "lucide-react";
// import CurrencyPopup from "../component/CurrencyPopup";

// const Product = () => {
//   const { products, timerExpire } = useContext(ShopContext);
//   const [showProduct, setShowProduct] = useState([]);
//   const [dealOver, setDealOver] = useState(false);
//   const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);

//   useEffect(() => {
//     // ✅ Show popup only once per session
//     const popupShown = sessionStorage.getItem("currencyPopupShown");
//     if (!popupShown) {
//       setShowCurrencyPopup(true);
//       sessionStorage.setItem("currencyPopupShown", "true");
//     }

//     if (products?.length > 0) {
//       setShowProduct(products);
//     }
//   }, [products]);

//   const handleDealEnd = () => {
//     setDealOver(true);
//   };

//   return (
//     <>
//       <DealTimer onDealEnd={handleDealEnd} />

//       {/* ✅ Currency popup shown only if not dismissed this session */}
//       {showCurrencyPopup && (
//         <CurrencyPopup onClose={() => setShowCurrencyPopup(false)} />
//       )}

//       {timerExpire && (
//         <div className="relative sm:max-w-[680px] md:max-w-[700px] lg:max-w-[1024px] 2xl:max-w-[1600px] h-[75vh] items-center justify-center mx-auto">
//           <div className="h-[65vh] flex justify-center mt-5 items-center relative group">
//             <Swiper
//               slidesPerView={6}
//               spaceBetween={10}
//               pagination={{ clickable: true }}
//               navigation={{
//                 nextEl: ".custom-next",
//                 prevEl: ".custom-prev",
//               }}
//               autoplay={{ delay: 3000 }}
//               loop={true}
//               modules={[Pagination, Autoplay, Navigation]}
//               breakpoints={{
//                 320: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 768: { slidesPerView: 4 },
//                 1024: { slidesPerView: 5 },
//               }}
//               className="mySwiper w-full flex items-center justify-center"
//             >
//               {showProduct.map((product, index) => {
//                 const imageCount = product.images?.edges?.length || 0;
//                 let imageIndex = 0;
//                 if (imageCount >= 36) imageIndex = 0;
//                 else if (imageCount >= 21) imageIndex = 0;
//                 else if (imageCount >= 10) imageIndex = 0;
//                 else imageIndex = 0;

//                 const mainImage = product.images?.edges?.[imageIndex]?.node?.url;
//                 const productId = product.id?.split("/").pop();

//                 return (
//                   <SwiperSlide
//                     key={product.id || index}
//                     className="cursor-pointer flex justify-center items-center"
//                   >
//                     <Link to={`/product/${productId}`}>
//                       <img
//                         src={mainImage || "https://via.placeholder.com/150"}
//                         alt={product.title}
//                         className="2xl:h-[500px] sm:h-full lg:h-[400px] h-[450px] object-contain"
//                       />
//                     </Link>
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper>

//             {/* ✅ Combined Rounded Navigation Buttons (Below Center) */}
//            {/* <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-6">
//               <div className="flex items-center justify-between w-28 bg-[#605c51] text-[#2d2b2a]  rounded-full p-0.5 shadow-md">
//                 <button className="custom-prev flex justify-center items-center w-8 h-8 rounded-full hover:bg-[#605c51] transition">
//                   <ChevronLeft size={15} />
//                 </button>
//                 <button className="custom-next flex justify-center items-center w-8 h-8 rounded-full hover:bg-[#605c51] transition">
//                   <ChevronRight size={15} />
//                 </button>
//               </div>
//             </div>*/}
//           </div>

//           {/* ✅ Overlay Logo */}
//           <div className="fixed inset-0 opacity-50 flex justify-center items-center pointer-events-none z-10">
//             <img src={assets.s4} alt="Logo" className="w-50 mix-blend-multiply" />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Product;


import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import DealTimer from "../component/DealTimer";
import CurrencyPopup from "../component/CurrencyPopup";

// ⭐ Mobile Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { assets } from "../assets/assets";

const Product = () => {
  const { products, timerExpire } = useContext(ShopContext);
  const [showProduct, setShowProduct] = useState([]);
  const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("currencyPopupShown");
    if (!popupShown) {
      setShowCurrencyPopup(true);
      sessionStorage.setItem("currencyPopupShown", "true");
    }

    if (products?.length > 0) {
      setShowProduct(products);
    }
  }, [products]);

  return (
    <>
      <DealTimer />

      {showCurrencyPopup && (
        <CurrencyPopup onClose={() => setShowCurrencyPopup(false)} />
      )}

      {timerExpire && (
        <div className="relative sm:max-w-[680px] md:max-w-[700px] lg:max-w-[1024px] 2xl:max-w-[1600px] mx-auto">

          {/* ⭐ MOBILE SWIPER — 2 IMAGES PER SLIDE (EXACTLY LIKE OLD ONE) */}
          <div className="sm:hidden mt-5 h-[65vh]">
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={2}        // ✅ EXACT OLD BEHAVIOR
              spaceBetween={10}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
              loop={true}
              className="w-full"
            >
              {showProduct.map((product, index) => {
                const imageIndex = 0;
                const mainImage = product.images?.edges?.[imageIndex]?.node?.url;
                const productId = product.id?.split("/").pop();

                return (
                  <SwiperSlide key={index} className="flex justify-center items-center">
                    <Link to={`/product/${productId}`}>
                      <img
                        src={mainImage || "https://via.placeholder.com/150"}
                        alt={product.title}
                        className="
                          w-full 
                          h-[450px]
                          2xl:h-[500px]
                          lg:h-[400px]
                          object-contain
                        "
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* ⭐ DESKTOP (UNTOUCHED) */}
          <div
            className="
              hidden sm:flex 
              h-[65vh] 
              gap-5 mt-5 items-center w-full
              overflow-x-auto overflow-y-hidden
              scrollbar-thin 
              scrollbar-thumb-[#605B55] 
              scrollbar-track-[#666259] 
              px-3
              scrollbar-thumb-rounded-full 
              scrollbar-track-rounded-full
            "
          >
            {showProduct.map((product, index) => {
              const imageIndex = 0;
              const mainImage = product.images?.edges?.[imageIndex]?.node?.url;
              const productId = product.id?.split("/").pop();

              return (
                <div key={product.id || index} className="shrink-0 flex flex-row">

                  <Link to={`/product/${productId}`}>
                    <img
                      src={mainImage || "https://via.placeholder.com/150"}
                      alt={product.title}
                      className="
                        2xl:h-[500px] 
                        sm:h-full 
                        lg:h-[400px] 
                        h-[450px]
                        object-contain
                      "
                    />
                  </Link>

                  {/* <Link to={`/product/${productId}`}>
                    <img
                      src={mainImage || "https://via.placeholder.com/150"}
                      alt={product.title}
                      className="
                        2xl:h-[500px] 
                        sm:h-full 
                        lg:h-[400px] 
                        h-[450px]
                        object-contain
                      "
                    />
                  </Link> */}

                </div>
              );
            })}
          </div>

          {/* ⭐ Overlay Logo */}
          <div className="fixed inset-0 opacity-50 flex justify-center items-center pointer-events-none z-10">
            <img src={assets.s4} alt="Logo" className="w-50 mix-blend-multiply" />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
