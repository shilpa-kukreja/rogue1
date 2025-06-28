import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";

const CheckOut = () => {
  const [method, setMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const [conversionRates, setConversionRates] = useState({});
  const {
    navigate,
    token,
    cart,
    setCart,
    getTotalPrice,
    delivery_fee,
    currency,
    setCurrency,
    products,

  } = useContext(ShopContext);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    currencytype: currency,
  });




  const currencies = [
    { label: "US Dollar", value: "USD" },
    { label: "Canadian Dollar", value: "CAD" },
    { label: "Australian Dollar", value: "AUD" },
    { label: "Pound", value: "GBP" },
    { label: "Euro", value: "EUR" },
    { label: "Yen", value: "JPY" },
  ];

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    setFormData((prev) => ({
      ...prev,
      currencytype: selectedCurrency, // 👈 this ensures it's stored in formData
    }));
    setShowCurrencyDropdown(false);
  };



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


  const cartTotal = convertPrice(getTotalPrice() + 10, currency);





  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/states')
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.error('Failed to fetch countries:', err);
      });
  }, []);

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    setCities([]);
    const country = countries.find(c => c.name === countryName);
    setStates(country?.states || []);
    setFormData((prev) => ({ ...prev, country: countryName }));
  };





  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    setCities([]);

    setFormData((prev) => ({ ...prev, state: stateName }));

    if (selectedCountry && stateName) {
      axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: selectedCountry,
        state: stateName
      })
        .then(res => {
          setCities(res.data.data || []);
        })
        .catch(err => {
          console.error('Failed to fetch cities:', err);
        });
    }
  };



  const applyCoupon = async () => {
    try {
      const totalAmount = cartTotal; // Total before discount
      const { data } = await axios.post(
        "https://rogue0707.com/api/coupon/apply",
        { code: couponCode, totalAmount },
        { headers: { token } }
      );

      if (data.success) {
        setDiscount(data.discount);
        setTotalAfterDiscount(data.newTotalAmount); // Update total price in UI
        console.log(data.newTotalAmount);
        toast.success(
          `Coupon applied successfully! You saved ₹${data.discount}`
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply coupon");
    }
  };

  // const initPay = (order) => {
  //   // Razorpay requires amount in smallest currency unit (e.g., cents for USD, pence for GBP)
  //   const amountInSubunits = Math.round(order.amount * 100);

  //   // Validate that the currency is supported by Razorpay
  //   const supportedCurrencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY'];
  //   if (!supportedCurrencies.includes(order.currency)) {
  //     toast.error(`Razorpay doesn't support ${order.currency} currency`);
  //     return;
  //   }


  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: Math.round(amountInSubunits * 100),
  //     currency: order.currency, // Use the currency from order
  //     name: "ROGUE0707",
  //     description: `Payment for Order ${order.receipt}`,
  //     order_id: order.id,

  //     handler: async (response) => {
  //       try {
  //         const { data } = await axios.post(
  //           "https://rogue0707.com/api/order/verifyRazorpay",
  //           {
  //             ...response,
  //             currency: order.currency, // Pass the currency to backend
  //             actualAmount: order.amount
  //           },
  //           { headers: { token } }
  //         );
  //         if (data.success) {
  //           console.log("order:",order);
  //           try {
  //             const shipRes = await axios.post(
  //               "https://rogue0707.com/api/order/ship",
  //               { orderData : order.orderData, orderid: order.id },
  //               { headers: { token } }
  //             );

  //             if (shipRes.data.success) {



  //           console.log("Shiprocket Response:", shipRes.data);
  //           await axios.post("https://rogue0707.com/api/order/send-order-confirmation", {
  //             email: order.orderData.address.email,
  //             firstName: order.orderData.address.firstName,
  //             orderId: order.id,
  //             products: order.orderData.items.map(item => ({
  //               productName: item.name,  
  //               variant: item.size, 
  //               amount: item.discountedprice,
        
  //             })),
  //             totalAmount: order.orderData.amount,
  //             shippingDetails: {
  //               name: `${order.orderData.address.firstName} ${order.orderData.address.lastName}`,
  //               address: order.orderData.address.street,
  //               city: order.orderData.address.city,
  //               state: order.orderData.address.state,
  //               pincode: order.orderData.address.zipcode,
  //               phone: order.orderData.address.phone
  //             }
  //           });


  //           navigate("/orders");
  //           setCart([]);
  //           toast.success("Payment successful! Your order has been placed.");
  //         }else {
  //               toast.error("Shipping failed after payment.");
  //             }
  //           } catch (shipErr) {
  //             console.error(shipErr);
  //             toast.error("Shipping error after payment.");
  //           }
  //         } else {
  //           toast.error(data.message || "Payment verification failed.");
  //         }
        
  //      } catch (error) {
  //         console.error(error);
  //         toast.error("Payment verification failed");
  //       }
  //     },
  //     prefill: {
  //       name: `${formData.firstName} ${formData.lastName}`,
  //       email: formData.email,
  //       contact: formData.phone
  //     },
  //     notes: {
  //       address: `${formData.street}, ${formData.city}, ${formData.country}`
  //     },
  //     theme: {
  //       color: "#605B55"
  //     }
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // }


  const initPay = (order) => {
  const amountInSubunits = Math.round(order.amount * 100);

  const supportedCurrencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY'];
  if (!supportedCurrencies.includes(order.currency)) {
    toast.error(`Razorpay doesn't support ${order.currency} currency`);
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: Math.round(amountInSubunits * 100),
    currency: order.currency,
    name: "ROGUE0707",
    description: `Payment for Order ${order.receipt}`,
    order_id: order.id,

    handler: async (response) => {
      try {
        const { data: verifyData } = await axios.post(
          "https://rogue0707.com/api/order/verifyRazorpay",
          {
            ...response,
            currency: order.currency,
            actualAmount: order.amount
          },
          { headers: { token } }
        );

        if (verifyData.success) {
          try {
            const { data: shipData } = await axios.post(
              "https://rogue0707.com/api/order/ship",
              {
                orderData: order.orderData,
                orderid: order.id
              },
              { headers: { token } }
            );

            console.log("Shiprocket Response:", shipData);
            console.log("order data brefore send email", order);

            if (shipData.success) {
              const res = await axios.post("https://rogue0707.com/api/order/send-order-confirmation", {
                email: order.orderData.address.email,
                firstName: order.orderData.address.firstName,
                orderId: order.id,
                products: order.orderData.items.map(item => ({
                  productName: item.name,
                  variant: item.size,
                  amount: item.discountedprice,
                })),
                totalAmount: order.orderData.amount,
                shippingDetails: {
                  name: `${order.orderData.address.firstName} ${order.orderData.address.lastName}`,
                  address: order.orderData.address.street,
                  city: order.orderData.address.city,
                  state: order.orderData.address.state,
                  pincode: order.orderData.address.zipcode,
                  phone: order.orderData.address.phone
                }
              });

              console.log("backend response", res.data);

              setCart([]);
              navigate("/orders");
              toast.success("Payment successful! Your order has been placed.");
            } else {
              toast.error("Shipping failed after payment.");
              console.error("Shipping failed:", shipData);
            }
          } catch (shipErr) {
            console.error("Shipping error:", shipErr.response?.data || shipErr.message);
            toast.error("Shipping error after payment.");
          }
        } else {
          toast.error(verifyData.message || "Payment verification failed.");
        }

      } catch (error) {
        console.error("Payment verification failed:", error.response?.data || error.message);
        toast.error("Payment verification failed");
      }
    },

    prefill: {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contact: formData.phone
    },

    notes: {
      address: `${formData.street}, ${formData.city}, ${formData.country}`
    },

    theme: {
      color: "#605B55"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


  const onSubmitHandler = async (event) => {

    event.preventDefault();

    if (!token) {
      toast('Login REQUIRED', {
        style: {
          background: '#605B55',
          color: '#A9ABAE',
          width: '300px',
          fontSize: '10px',
          borderRadius: '8px',
          fontFamily: "'Andale Mono', monospace"
        },
        progressStyle: {
          background: '#5C4033',
        },
      });
      return;
    }
    try {
      // Ensure cart is not empty
      if (!cart || cart.length === 0) {
        return toast.error(
          "Your cart is empty. Please add items before checkout."
        );
      }

      // Extract and format order items
      let orderItems = cart.map((item) => {
        const selectedSizeInfo = item.variants?.[0]?.sizesInfo?.find(
          (s) => s.size === item.size
        );

        return {
          _id: item._id,
          name: item.name,
          image: item.images?.[0] || "",
          size: item.size,
          quantity: item.quantity,
          discountedprice: Number(selectedSizeInfo?.discountPrice) || 0,
          actualprice: Number(selectedSizeInfo?.actualPrice) || 0,
        };
      });

      // console.log("Items in Order:", orderItems); // Debugging

      if (orderItems.length === 0) {
        return toast.error("No items selected for the order.");
      }


      const subtotalUSD = orderItems.reduce((sum, item) =>
        sum + (item.discountedprice * item.quantity || 0), 0);
      // Calculate the total amount correctly
      const deliveryFeeUSD = 10; // Assuming $10 base delivery fee
      const totalUSD = subtotalUSD + deliveryFeeUSD - (discount || 0);

      // Convert to selected currency
      const finalAmount = convertPrice(totalUSD, currency);

      const orderData = {
        address: formData,
        items: orderItems,
        amount: parseFloat(finalAmount),
        currency: currency,
        baseAmountUSD: totalUSD, // Store original USD amount
        couponCode,
        discount,
        paymentMethod: method
      };



      console.log("Order Data Before Sending:", orderData); // Debugging

      switch (method) {
        case "cod": {
          const response = await axios.post(
            "https://rogue0707.com/api/order/place",
            orderData,
            { headers: { token } }
          );

          console.log("Order Response:", response.data); // Debugging

          if (response.data.success) {
            setCart([]); // Clear cart after order
            navigate("/orders");


          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "razorpay": {
          const responseRazorpay = await axios.post(
            "https://rogue0707.com/api/order/razorpay",
            {
              ...orderData,
              currency: currency, // Ensure currency is passed
              amount: parseFloat(finalAmount)
            },
            { headers: { token } }
          );

          // console.log("Razorpay Response:", responseRazorpay.data); // Debugging

          if (responseRazorpay.data.success) {

            initPay({
              ...responseRazorpay.data.order,
              amount: parseFloat(finalAmount),
              currency: currency,
              orderData,
            });
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error("Error Placing Order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };





  return (
    <>
      <div className="sm:px-10   ">
        <div className="container mx-auto p-6 grid md:grid-cols-3 gap-6">
          <div className=" p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-sm  mb-2 text-[#A9ABAE]">BILLING ADDRESS</h2>
            <form
              onSubmit={onSubmitHandler}
              className="grid grid-cols-2 gap-4"
              id="Form"
            >
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                className=" border-b w-full focus:outline-none   p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]   mt-5 "
                type="text"
                placeholder="First Name"
              />
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                className=" border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]  mt-5 "
                type="text"
                placeholder="Last Name"
              />
              <input
                required
                onChange={onChangeHandler}
                name="email"
                value={formData.email}
                className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]   mt-5 col-span-2"
                type="email"
                placeholder="Email Address"
              />
              <input
                required
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]   mt-5"
                type="text"
                placeholder="Pin Code"
              />
              <input
                required
                onChange={onChangeHandler}
                name="phone"
                value={formData.phone}
                className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]   mt-5"
                type="text"
                placeholder="Mobile"
              />
              <input
                required
                onChange={onChangeHandler}
                name="street"
                value={formData.street}
                className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]   mt-5 col-span-2"
                type="text"
                placeholder="Address"
              />
              <div>

                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]  mt-5"
                >
                  <option className="text-[#A9ABAE] bg-[#605B55] " value="">Select Country</option>
                  {countries.map((c) => (
                    <option className="text-[#A9ABAE] bg-[#605B55]" key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>

                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]  mt-5"
                  disabled={!selectedCountry}
                >
                  <option className="text-[#A9ABAE] bg-[#605B55] " value="">{selectedCountry ? "Select State" : "Select Country First"}</option>
                  {states.map((s) => (
                    <option className="text-[#A9ABAE] bg-[#605B55] " key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>

                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setFormData((prev) => ({ ...prev, city: e.target.value }));
                  }}
                  className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]  mt-5"
                  disabled={!selectedState || cities.length === 0}
                >
                  <option className="text-[#A9ABAE] bg-[#605B55] " value="">
                    {selectedState ? (cities.length > 0 ? "Select City" : "No cities found") : "Select State First"}
                  </option>
                  {cities.map((cityName) => (
                    <option className="text-[#A9ABAE] bg-[#605B55] " key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
              </div>
              <input
                className="border-b w-full focus:outline-none  p-2 placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]  mt-5"
                type="text"
                placeholder="Alt Mobile"
              />
              <div className="relative hidden">
                <button onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)} className="...">
                  {currency}
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute z-10 mt-2 bg-white border shadow-md rounded-md">
                    {currencies.map((curr) => (
                      <div
                        key={curr.value}
                        onClick={() => handleCurrencyChange({ target: { value: curr.value } })}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {currencySymbols[curr.value]} {curr.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* Payment and Shipping */}
          <div className="  p-6 rounded-lg shadow-md">
            <h2 className="text-sm  mb-4 text-[#A9ABAE]">
              PAYMENT AND SHIPPING
            </h2>
            <div className="flex flex-col gap-4">
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${method === "razorpay"
                  ? "border-black shadow-md bg-gradient-to-r from-gray-50 to-gray-100"
                  : "border-gray-200 hover:border-black hover:bg-gray-50"
                  }`}
              >
                <div
                  className={`w-4 h-4 border rounded-full flex items-center justify-center ${method === "razorpay"
                    ? "bg-black border-black"
                    : "border-gray-300"
                    }`}
                >
                  {method === "razorpay" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <p className="text-[#A9ABAE] text-[10px] font-medium">RAZORPAY</p>
              </div>

            </div>
            <p className="text-[#A9ABAE] text-[10px] mt-4">
              Finalize your sustainable shopping journey with ease. Complete
              your order and contribute to positive change today!
            </p>
            <div className="mt-4 hidden">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-[#A9ABAE] p-2 rounded w-full placeholder-[#A9ABAE] text-[#A9ABAE] text-[10px]"
                type="text"
                placeholder="Enter Coupon Code"
              />
              <button
                onClick={applyCoupon}
                className="text-[#D2D3D5] bg-[#605B55] text-[10px] cursor-pointer px-4 py-2 rounded w-full mt-2"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="mt-2 text-green-600">
                Discount Applied: ₹{discount}
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div className="   p-6 rounded-lg shadow-md">
            <h2 className="text-sm   mb-4 text-[#A9ABAE]">ORDER SUMMARY</h2>
            <p className="text-[10px] text-[#A9ABAE] ">
              Subtotal:{" "}
              <span className="font-semibold float-end">
                {convertPrice(getTotalPrice(), currency)} {currency}
              </span>
            </p>
            <p className="text-[10px] text-[#A9ABAE] ">
              Delivery Fee: <span className="font-semibold float-end">10 {currency}</span>
            </p>
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <p>Discount</p>
                <p className="font-medium text-green-600">-₹{discount}</p>
              </div>
            )}
            <p className="font-bold text-[10px] mt-2  text-[#A9ABAE]">
              Total:{" "}
              <span className=" float-end">
                {totalAfterDiscount !== null ? totalAfterDiscount : cartTotal} {currency}
              </span>
            </p>
            <button
              type="submit"
              form="Form"
              className="text-[#D2D3D5] text-[10px] bg-[#605B55] cursor-pointer px-4 py-2 rounded w-full mt-2"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;