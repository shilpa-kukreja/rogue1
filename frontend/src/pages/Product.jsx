import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
// import DealTimer from '../component/DealTimer';
// import DealTimer from '../component/DealTimer';


const Product = () => {


  const { products } = useContext(ShopContext)
  const [showProduct, setShowProduct] = useState([])

  useEffect(() => {
    if (products) {
      setShowProduct(products);
    }
  }, [products])

  console.log(products)
  return (
    <>
  
     {/* <DealTimer/> */}
     <div className='sm:max-w-[680px]    md:max-w-[700px]   lg:max-w-[1024px]  2xl:max-w-[1600px] h-[75vh] items-center justify-center mx-auto'>

     
      {/* <h2 className='uppercase  pb-3  text-[#d2d3d4] text-2xl  text-center'>Rouge</h2> */}
   

      {/* slider code  */}
       <div className='h-[65vh] flex justify-center mt-5 items-center'>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[ Pagination, Autoplay]}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="mySwiper w-full  flex items-center justify-center"
      >
        {showProduct.map((product, index) => (
  <SwiperSlide key={product._id || index} className="cursor-pointer flex justify-center items-center">
    <Link to={`/product/${product._id}`}>
      {product.variants?.length > 0 && product.variants[0]?.images?.length > 0 ? (
        <img
          src={`https://rogue0707.com${product.variants[0].images[0]}`}

          alt={product.name}
          className=" 2xl:h-[500px]  flex justify-center  sm:h-[100%] lg:h-[400px] h-[450px]   "
        />
      ) : (
        <img
          src="https://via.placeholder.com/150" // Fallback image
          alt="No Image Available"
          className="object-cover  w-50"
        />
      )}
    </Link>
  </SwiperSlide>
))}

      </Swiper>
      </div>






      {/* show logo in center  */}



      <div className="fixed inset-0 opacity-50 flex justify-center items-center pointer-events-none z-10 ">
        <img
          src={assets.s4}
          alt="Logo"
          className="w-50 mix-blend-multiply"
        />
      </div>







      {/* all information page  */}

      {/* <div className='px-10 fixed top-15 left-28'>
                 <button className='p-2 border  text-xs cursor-pointer'>info</button>
                   <div className='grid'>
                    <Link className='text-xs underline  text-[#d2d2d4]'  to="/contact">contact</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="/shipping">shipping</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="/return-policy">return policy</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="/privacy-policy">privacy policy</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="/terms">terms</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="/preOrderTerms">pre-order terms</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="stocklists">stocklists</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="newsletter">newsletter</Link>
                    <Link className='text-xs text-[#d2d2d4]' to="career">careers</Link>
                   </div>
               </div> */}

      
      </div>
    </>
  )
}

export default Product
