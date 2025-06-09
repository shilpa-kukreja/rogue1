import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";

const Orders = () => {
  const { token,currency, } = useContext(ShopContext);
  const [conversionRates, setConversionRates] = useState({});

  
  const [orderData,setOrderData]=useState([])
  const loadOrderData=async()=>{
    try {
      if (!token) {
        return null
      }
      const response=await axios.post( 'https://rogue0707.com/api/order/userorders',{},{headers:{token}})
     if (response.data.success) {
      let allOrdersItem=[]
      response.data.orders.map((order)=>{
        order.items.map((item)=>{
       item['status']=order.status
       item['payment']=order.payment
       item['paymentMethod']=order.paymentMethod
       item['date']=order.date
       allOrdersItem.push(item)
        })

      })
      setOrderData(allOrdersItem.reverse())
     }
    } catch (error) {
      console.log(error)
       toast.error("Failed to load user order");
    }
  }

  useEffect(()=>{
  loadOrderData()
  },[token])

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
  

  const currencySymbols = {
    USD: "$",
    CAD: "CA$",
    AUD: "AU$",
    GBP: "£",
    EUR: "€",
    JPY: "¥",
  };

  

  return (
    <div className=" pt-5 pb-16 px-6 md:px-16 lg:px-28 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-lg  font-medium text-[#A9ABAE] ">
          YOUR ORDERS
        </h1>
        <p className="text-[#A9ABAE] text-[10px]mt-2">Track and manage your recent orders.</p>
      </div>

      {orderData.length > 0 ? (
        <div className="space-y-8 max-w-5xl mx-auto">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="p-5 md:p-6   rounded-md  flex flex-col md:flex-row md:items-center justify-between gap-6  hover:border-gray-300 transform "
            >
              
              <div className="flex items-center gap-6 text-[10px] md:flex-1">
                <img
                  className="w-20  sm:w-24 rounded-lg  object-cover"
                  src={`https://rogue0707.com${item.image || "default-image.jpg"}`}
                  alt={item.name}
                />
                <div>
                  <p className=" font-medium text-[#A9ABAE] text-[10px]">{item.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-[#A9ABAE] text-[10px]">
                    <p className=" font-medium text-[#A9ABAE] text-[10px]">
                      {convertPrice(item.discountedprice, currency)} {currency}
                    </p>
                    <span className="text-[#A9ABAE] text-[10px]">Qty: {item.quantity}</span>
                    <span className="text-[#A9ABAE] text-[10px]">Size: {item.size}</span>
                  </div>
                  <div className="mt-3 space-y-1 text-gray-600">
                    <p className="text-[#A9ABAE] text-[10px]">
                      Date: <span className="font-medium">{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className="text-[#A9ABAE] text-[10px]">
                      Payment: <span className="font-medium">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="flex md:w-1/3 justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#605B55] animate-pulse"></span>
                  <p className="text-[#A9ABAE] text-[10px] font-medium">
                  {item.status}
                  </p>
                </div>
                <button onClick={loadOrderData} className="inline-block px-4 py-2 text-[10px] bg-[#605B55] text-[#D2D3D5] cursor-pointer rounded-full">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
