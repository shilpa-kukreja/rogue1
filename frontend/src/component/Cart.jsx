// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { IoIosArrowRoundBack } from "react-icons/io";

// const Cart = () => {
//   const [conversionRates, setConversionRates] = useState({});
//   const {
//     cart,
//     removeFromCart,
//     updateQuantity,
//     currency,
//     getTotalPrice,
//     getProductTotalPrice,
//   } = useContext(ShopContext);

  

//  // Fetch conversion rates from API
//    useEffect(() => {
//      fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
//        .then(res => res.json())
//        .then(data => {
//          if (data && data.usd) {
//            setConversionRates(data.usd);
//          }
//        })
//        .catch(err => console.error("Error fetching currency rates:", err));
//    }, []);
 
//    const convertPrice = (priceInUSD, selectedCurrency) => {
//      const rate = conversionRates[selectedCurrency.toLowerCase()] || 1;
//      return (priceInUSD * rate).toFixed(2);
//    };
 

//    if (cart.length === 0) {
//     return (
//       <div className="text-center text-2xl w-[100vw] h-[60vh]">
//         <p className="text-[#A9ABAE] mt-10">Your cart is empty.</p>
//         <Link to="/products" className="cursor-pointer text-sm text-[#A9ABAE] font-bold underline">
//           Buy Now
//         </Link>
//       </div>
//     );
//   }
 

//   return (
//     <>
//       <div className="fixed  inset-0 flex  min-h-[100vh] justify-center items-center pointer-events-none z-10">
//         <img src={assets.s4} alt="Logo" className="w-70 mix-blend-multiply opacity-40" />
//       </div>

//       <div className="container m-auto  h-full sm:min-h-[75vh]">
//         <div>
//           <div className="top_header hidden md:flex justify-between text-[#A9ABAE] text-[10px]">
//             <div>Product</div>
//             <div></div>
//             <div>Price</div>
//             <div>Size</div>
//             <div>Quantity</div>
//             <div>Total</div>
//             <div></div>
//           </div>

//           <div className="detail_container mt-12 text-[#A9ABAE] text-[10px]">
//             {cart.map((item, index) => (
              

//               <div key={index} className="flex  justify-between items-center border-b py-4">
//                 <img
//                   src={`https://rogue0707.com${item.images?.[0] || "default-image.jpg"}`}
//                   alt={item.name}
//                   className="w-15 object-cover"
//                 />

//                 <div className="md:contents">
//                   <h4>{item.name}</h4>

//                   <div className="flex">
//                     <p className="md:hidden">Price : &nbsp;</p>
//                     <p>
                      
//                     {convertPrice(item.discountPrice, currency)} {currency}
//                     </p>
//                   </div>

//                   <div className="flex">
//                     <p className="md:hidden">Size : &nbsp;</p>
//                     <p>{item.size}</p>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <p className="md:hidden">Quantity: </p>
//                     <input
//                       type="number"
//                       className="w-12 text-center outline-none rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//                       value={item.quantity}
//                       min="1"
//                       // onChange={(e) =>
//                       //   updateQuantity(item._id, item.size, parseInt(e.target.value))
//                       // }
//                     />
//                   </div>

//                   <div className="product flex">
//                     <p className="md:hidden">Total : &nbsp;</p>
//                     <h3 className="text-[10px] font-semibold">
                     
//                       {convertPrice(getProductTotalPrice(item._id, item.size), currency)} {currency}
//                     </h3>
//                   </div>
//                 </div>

//                 <button
//   className="text-gray-300 cursor-pointer hover:underline"
//   onClick={() => {
//     console.log("Removing:", item._id, item.size);
//     removeFromCart(item._id, item.size);
//   }}
// >
//   X
// </button>

              
//               </div>
//             ))}
//           </div>

//           <div className="w-10/12 py-12">
//             <h3 className="text-[#A9ABAE] text-[10px] font-medium">
//               Subtotal: 
//               {convertPrice(getTotalPrice(), currency)} {currency}
//             </h3>
//             <p className="text-[10px] mt-4 text-[#A9ABAE]">
//               Shipping and all applicable taxes & duties calculated at checkout.
//             </p>
//             <p className="text-[10px] mt-4 text-[#A9ABAE]">
//               No returns or exchanges on discounted / sale items.
//             </p>
//             <Link
//               to="/checkout"
//               className="mt-7 inline-block px-4 py-2 text-[10px] bg-[#605B55] text-[#D2D3D5] cursor-pointer rounded-full"
//             >
//               Proceed to Checkout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;





// import React, { useContext, useEffect, useState } from "react";
// import {
//   getCart,
//   removeLineItem,
//   updateLineItemQuantity,
// } from "../utils/shopifyCart";
// import { Link } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../Context/ShopContext";
// import { debounce } from "lodash";

// const Cart = () => {
//   const [cartData, setCartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { currency } = useContext(ShopContext);
//   const [usdToCurrencyRate, setUsdToCurrencyRate] = useState(1);
//   const [localQuantities, setLocalQuantities] = useState({});

//   const fetchCartData = async () => {
//     const cartId = localStorage.getItem("cart_id");
//     if (!cartId) return setLoading(false);
//     try {
//       const cart = await getCart(cartId);
//       setCartData(cart);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   const cartItems = cartData?.lines?.edges || [];

//   useEffect(() => {
//     if (cartItems.length > 0) {
//       const initialQuantities = {};
//       cartItems.forEach(({ node }) => {
//         initialQuantities[node.id] = node.quantity;
//       });
//       setLocalQuantities(initialQuantities);
//     }
//   }, [cartItems]);

//   useEffect(() => {
//     if (currency.toLowerCase() === "inr") {
//       setUsdToCurrencyRate(1);
//     } else {
//       fetch(
//         "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data?.inr && data.inr[currency.toLowerCase()]) {
//             setUsdToCurrencyRate(data.inr[currency.toLowerCase()]);
//           } else {
//             console.warn("Currency not found:", currency);
//             setUsdToCurrencyRate(1);
//           }
//         })
//         .catch((err) => {
//           console.error("Currency fetch error:", err);
//           setUsdToCurrencyRate(1);
//         });
//     }
//   }, [currency]);

//   const convertPrice = (priceInINR) =>
//     (priceInINR * usdToCurrencyRate).toFixed(2);

//   const debouncedUpdateQuantity = debounce((lineId, quantity) => {
//     if (quantity >= 1) {
//       updateLineItemQuantity(lineId, quantity).then(fetchCartData);
//     }
//   }, 600);

//   const handleQuantityChange = (lineId, value) => {
//     const number = parseInt(value);
//     if (!isNaN(number)) {
//       setLocalQuantities((prev) => ({
//         ...prev,
//         [lineId]: number < 1 ? 1 : number,
//       }));
//       if (number >= 1) {
//         debouncedUpdateQuantity(lineId, number);
//       }
//     }
//   };

//   const handleRemove = async (lineId) => {
//     await removeLineItem(lineId);
//     fetchCartData();
//   };

//   if (loading) return <p className="text-center text-gray-400 mt-10">Loading cart...</p>;

//   if (!cartData || cartItems.length === 0) {
//     return (
//       <div className="text-center text-xl text-gray-400 mt-20">
//         Your cart is empty. <br />
//         <Link to="/products" className="text-blue-400 underline">Browse Products</Link>
//       </div>
//     );
//   }

//   const total = cartItems.reduce((acc, item) => {
//     const price = parseFloat(item.node.merchandise.price.amount);
//     return acc + item.node.quantity * price;
//   }, 0);

//   return (
//     <>
//       <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-10">
//         <img
//           src={assets.s4}
//           alt="Logo"
//           className="w-72 mix-blend-multiply opacity-30"
//         />
//       </div>
//       <div className="container m-auto h-full sm:min-h-[75vh]">
//         <div className="relative z-10 text-[#D2D3D5] min-h-screen font-mono tracking-wide bg-transparent">
         

//           {/* ----------- Desktop Layout ----------- */}
//           <div className="hidden md:block">
//             <div className="grid grid-cols-7 text-xs text-center uppercase text-[#A9ABAE] mb-4">
//               <div className="col-span-1">Image</div>
//               <div className="col-span-1">Name</div>
//               <div className="col-span-1">Price</div>
//               <div className="col-span-1">Size</div>
//               <div className="col-span-1">Quantity</div>
//               <div className="col-span-1">Total</div>
//               <div className="col-span-1"></div>
//             </div>

//             {cartItems.map(({ node }, idx) => {
//               const item = node.merchandise;
//               const size = item.title;
//               const price = parseFloat(item.price.amount);
//               const totalItemPrice = price * node.quantity;

//               return (
//                 <div
//                   key={idx}
//                   className="grid grid-cols-7 justify-center text-center items-center border-b py-4"
//                 >
//                   <div className="col-span-1 flex items-center justify-center">
//                     <img
//                       src={item.image?.url}
//                       alt={item.product.title}
//                       className="w-15 object-cover "
//                     />
//                     </div>

//                     <div>
//                     <h2 className="text-[10px] text-[#A9ABAE]">{item.product.title}</h2>
//                   </div>
//                   <div className="col-span-1 text-[10px] text-[#A9ABAE]">
//                     {convertPrice(price)} {currency}
//                   </div>
//                   <div className="col-span-1 text-[10px] text-[#A9ABAE]">
//                     {size}
//                   </div>
//                   <div className="col-span-1 flex items-center justify-center gap-2 text-[10px] text-[#A9ABAE]">
//                     <input
//                       type="number"
//                       className="w-12 text-center outline-none rounded appearance-none bg-transparent text-[10px] text-[#A9ABAE]  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//                       min="1"
//                       value={localQuantities[node.id] || node.quantity}
//                       onChange={(e) => handleQuantityChange(node.id, e.target.value)}
//                     />
//                   </div>
//                   <div className="col-span-1 text-[10px] text-[#A9ABAE]">
//                     {convertPrice(totalItemPrice)} {currency}
//                   </div>
//                   <div className="col-span-1">
//                     <button
//                       onClick={() => handleRemove(node.id)}
//                       className="text-[10px] text-[#A9ABAE] "
//                     >
//                       X
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ----------- Mobile Layout ----------- */}
//           <div className="md:hidden space-y-6 ">
//             {cartItems.map(({ node }, idx) => {
//               const item = node.merchandise;
//               const size = item.title;
//               const price = parseFloat(item.price.amount);
//               const totalItemPrice = price * node.quantity;

//               return (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-4 justify-between border-b border-[#A9ABAE] pb-4"
//                 >
//                   <img
//                     src={item.image?.url}
//                     alt={item.product.title}
//                     className="w-15 object-cover rounded"
//                   />


//                   <div className="text-[10px]  items-center  justify-center  text-[#A9ABAE] font-mono relative">
                   
//                     <h2 className="uppercase  mb-1">{item.product.title}</h2>
//                     <p className="text-[#A9ABAE]">PRICE&nbsp;: {convertPrice(price)} {currency}</p>
//                     <p className="text-[#A9ABAE]">SIZE&nbsp;: {size}</p>
//                     <div className="flex-1 items-center  gap-2">
//                       <span className="text-[#A9ABAE]">QUANTITY&nbsp;:</span>
//                       <input
//                         type="number"
//                         min="1"
//                         className="w-12 px-1 text-center bg-transparent  outline-none  text-[#A9ABAE] rounded text-[10px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//                         value={localQuantities[node.id] || node.quantity}
//                         onChange={(e) => handleQuantityChange(node.id, e.target.value)}
//                       />
//                     </div>
//                     <p className="text-[#A9ABAE] mt-1">TOTAL&nbsp;: {convertPrice(totalItemPrice)} {currency}</p>

                  
//                   </div>
//                     <button
//                       onClick={() => handleRemove(node.id)}
//                       className=" text-[#A9ABAE]  text-sm"
//                     >
//                       X
//                     </button>
//                 </div>
                 
//               );
//             })}
//           </div>

      

//           <div className="text-[10px] mt-4 text-[#A9ABAE] space-y-2">
//             <p>
//               SUBTOTAL: {convertPrice(total)} {currency}
//             </p>
//             <p>
//               SHIPPING AND ALL APPLICABLE TAXES & DUTIES CALCULATED AT
//               CHECKOUT.
//             </p>
//             <p>NO RETURNS OR EXCHANGES ON DISCOUNTED / SALE ITEMS.</p>
//           </div>

//           <Link
//             to={cartData.checkoutUrl}
//             className="mt-6 inline-block px-6 py-2 text-[10px] bg-[#605B55] text-[#D2D3D5] rounded-full hover:bg-[#726d67]"
//           >
//             PROCEED TO CHECKOUT
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;



import React, { useContext, useEffect, useState } from "react";
import {
  getCart,
  removeLineItem,
  updateLineItemQuantity,
} from "../utils/shopifyCart";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import { debounce } from "lodash";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(ShopContext);
  const [rate, setRate] = useState(1);
  const [localQuantities, setLocalQuantities] = useState({});

  // Fetch cart data
  const fetchCartData = async () => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      setLoading(false);
      return;
    }
    try {
      const cart = await getCart(cartId);
      setCartData(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const items = cartData?.lines?.edges || [];

  // Initialize local quantities
  useEffect(() => {
    const q = {};
    items.forEach(({ node }) => (q[node.id] = node.quantity));
    setLocalQuantities(q);
  }, [items]);

  // Fetch currency rate if not INR
  useEffect(() => {
    const lower = currency.toLowerCase();
    if (lower === "inr") {
      setRate(1);
      return;
    }

    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const rateValue = data?.inr?.[lower];
        if (rateValue) setRate(rateValue);
        else {
          console.warn("Currency not found:", currency);
          setRate(1);
        }
      })
      .catch((err) => {
        console.error("Currency fetch error:", err);
        setRate(1);
      });
  }, [currency]);

  const convert = (amountINR) => (amountINR * rate).toFixed(2);

  // Debounced quantity update
  const debouncedUpdate = debounce(async (lineId, qty) => {
    if (qty >= 1) {
      await updateLineItemQuantity(lineId, qty);
      fetchCartData();
    }
  }, 600);

  const handleQuantityChange = (lineId, val) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      const safeQty = num < 1 ? 1 : num;
      setLocalQuantities((prev) => ({ ...prev, [lineId]: safeQty }));
      debouncedUpdate(lineId, safeQty);
    }
  };

  const handleRemove = async (lineId) => {
    await removeLineItem(lineId);
    fetchCartData();
  };

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading cart...</p>;
  }

  if (!cartData || items.length === 0) {
    return (
      <div className="text-center text-xl text-gray-400 mt-20">
        Your cart is empty. <br />
        <Link to="/products" className="text-blue-400 underline">
          Browse Products
        </Link>
      </div>
    );
  }

  const subtotalINR = items.reduce(
    (acc, { node }) => acc + parseFloat(node.merchandise.price.amount) * node.quantity,
    0
  );

  const handleInitiateCheckout = () => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        value: subtotalINR,
        currency: "INR",
        num_items: items.length,
        content_type: "product",
      });
    } else {
      console.warn("Meta Pixel not available for InitiateCheckout.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-10">
        <img src={assets.s4} alt="Logo" className="w-72 mix-blend-multiply opacity-30" />
      </div>

      <div className="container mx-auto h-full sm:min-h-[75vh]">
        <div className="relative z-10 text-[#D2D3D5] min-h-screen font-mono tracking-wide bg-transparent">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-7 text-xs text-center uppercase text-[#A9ABAE] mb-4">
            {["Image", "Name", "Price", "Size", "Quantity", "Total", ""].map((h, i) => (
              <div key={i} className={`col-span-1`}>{h}</div>
            ))}
          </div>

          {/* Items */}
          {items.map(({ node }, i) => {
            const variant = node.merchandise;
            const price = parseFloat(variant.price.amount);
            const totalPrice = price * node.quantity;

            return (
              <div key={i} className="grid grid-cols-7 items-center border-b py-4 text-center">
                <div className="col-span-1 flex justify-center">
                  <img src={variant.image?.url} alt={variant.product.title} className="w-15 object-cover" />
                </div>
                <div className="text-[10px] text-[#A9ABAE]">{variant.product.title}</div>
                <div className="col-span-1 text-[10px] text-[#A9ABAE]">{convert(price)} {currency}</div>
                <div className="col-span-1 text-[10px] text-[#A9ABAE]">{variant.title}</div>
                <div className="col-span-1 flex justify-center gap-2">
                  <input
                    type="number"
                    min="1"
                    className="w-12 text-center text-[10px] text-[#A9ABAE] bg-transparent outline-none"
                    value={localQuantities[node.id] || node.quantity}
                    onChange={(e) => handleQuantityChange(node.id, e.target.value)}
                  />
                </div>
                <div className="col-span-1 text-[10px] text-[#A9ABAE]">{convert(totalPrice)} {currency}</div>
                <div className="col-span-1">
                  <button onClick={() => handleRemove(node.id)} className="text-[10px] text-[#A9ABAE]">X</button>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          <div className="text-[10px] mt-4 text-[#A9ABAE] space-y-2">
            <p>SUBTOTAL: {convert(subtotalINR)} {currency}</p>
            <p>
              SHIPPING AND ALL APPLICABLE TAXES & DUTIES CALCULATED AT CHECKOUT.
            </p>
            <p>NO RETURNS OR EXCHANGES ON DISCOUNTED / SALE ITEMS.</p>
          </div>

          {/* Checkout Button */}
          <Link
            to={cartData.checkoutUrl}
            onClick={handleInitiateCheckout}
            className="mt-6 inline-block px-6 py-2 text-[10px] bg-[#605B55] text-[#D2D3D5] rounded-full hover:bg-[#726d67]"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;

