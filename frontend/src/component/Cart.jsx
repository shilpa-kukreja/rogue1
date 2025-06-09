import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { IoIosArrowRoundBack } from "react-icons/io";

const Cart = () => {
  const [conversionRates, setConversionRates] = useState({});
  const {
    cart,
    removeFromCart,
    updateQuantity,
    currency,
    getTotalPrice,
    getProductTotalPrice,
  } = useContext(ShopContext);

  

 // Fetch conversion rates from API
   useEffect(() => {
     fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
       .then(res => res.json())
       .then(data => {
         if (data && data.usd) {
           setConversionRates(data.usd);
         }
       })
       .catch(err => console.error("Error fetching currency rates:", err));
   }, []);
 
   const convertPrice = (priceInUSD, selectedCurrency) => {
     const rate = conversionRates[selectedCurrency.toLowerCase()] || 1;
     return (priceInUSD * rate).toFixed(2);
   };
 

   if (cart.length === 0) {
    return (
      <div className="text-center text-2xl w-[100vw] h-[60vh]">
        <p className="text-[#A9ABAE] mt-10">Your cart is empty.</p>
        <Link to="/products" className="cursor-pointer text-sm text-[#A9ABAE] font-bold underline">
          Buy Now
        </Link>
      </div>
    );
  }
 

  return (
    <>
      <div className="fixed  inset-0 flex  min-h-[100vh] justify-center items-center pointer-events-none z-10">
        <img src={assets.s4} alt="Logo" className="w-70 mix-blend-multiply opacity-40" />
      </div>

      <div className="container m-auto  h-full sm:min-h-[75vh]">
        <div>
          <div className="top_header hidden md:flex justify-between text-[#A9ABAE] text-[10px]">
            <div>Product</div>
            <div></div>
            <div>Price</div>
            <div>Size</div>
            <div>Quantity</div>
            <div>Total</div>
            <div></div>
          </div>

          <div className="detail_container mt-12 text-[#A9ABAE] text-[10px]">
            {cart.map((item, index) => (
              

              <div key={index} className="flex  justify-between items-center border-b py-4">
                <img
                  src={`https://rogue0707.com${item.images?.[0] || "default-image.jpg"}`}
                  alt={item.name}
                  className="w-15 object-cover"
                />

                <div className="md:contents">
                  <h4>{item.name}</h4>

                  <div className="flex">
                    <p className="md:hidden">Price : &nbsp;</p>
                    <p>
                      
                    {convertPrice(item.discountPrice, currency)} {currency}
                    </p>
                  </div>

                  <div className="flex">
                    <p className="md:hidden">Size : &nbsp;</p>
                    <p>{item.size}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <p className="md:hidden">Quantity: </p>
                    <input
                      type="number"
                      className="w-12 text-center outline-none rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      value={item.quantity}
                      min="1"
                      // onChange={(e) =>
                      //   updateQuantity(item._id, item.size, parseInt(e.target.value))
                      // }
                    />
                  </div>

                  <div className="product flex">
                    <p className="md:hidden">Total : &nbsp;</p>
                    <h3 className="text-[10px] font-semibold">
                     
                      {convertPrice(getProductTotalPrice(item._id, item.size), currency)} {currency}
                    </h3>
                  </div>
                </div>

                <button
  className="text-gray-300 cursor-pointer hover:underline"
  onClick={() => {
    console.log("Removing:", item._id, item.size);
    removeFromCart(item._id, item.size);
  }}
>
  X
</button>

              
              </div>
            ))}
          </div>

          <div className="w-10/12 py-12">
            <h3 className="text-[#A9ABAE] text-[10px] font-medium">
              Subtotal: 
              {convertPrice(getTotalPrice(), currency)} {currency}
            </h3>
            <p className="text-[10px] mt-4 text-[#A9ABAE]">
              Shipping and all applicable taxes & duties calculated at checkout.
            </p>
            <p className="text-[10px] mt-4 text-[#A9ABAE]">
              No returns or exchanges on discounted / sale items.
            </p>
            <Link
              to="/checkout"
              className="mt-7 inline-block px-4 py-2 text-[10px] bg-[#605B55] text-[#D2D3D5] cursor-pointer rounded-full"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
