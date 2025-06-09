import { createContext } from "react";
import { products } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  console.log("products context:", products);
  const [token, setToken] = useState("");
  const [currency, setCurrency] = useState('USD');
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage on update

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, selectedSize) => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    // Ensure variants exist and extract sizesInfo properly
    const sizeInfo = product.variants[0]?.sizesInfo?.find(
      (size) => size.size === selectedSize
    );
    if (!sizeInfo) {
      alert("Invalid size selected!");
      return;
    }

    setCart((prevCart) => {
      // Check if any variant of this product already exists in cart
      const existingProduct = prevCart.find(item => item._id === product._id);

      if (existingProduct) {
        // Product already in cart - don't add again
        alert("This product is already in your cart!");
        return prevCart;
      } else {
        // Add new product to cart
        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
            size: selectedSize,
            actualPrice: sizeInfo.actualPrice,
            discountPrice: sizeInfo.discountPrice,
            images: product.variants[0]?.images || [],
          },
        ];
      }
    });

    if (token) {
      try {
        await axios.post(
          "https://rogue0707.com/api/cart/add",
          {
            itemId: product._id,
            size: selectedSize,
          },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const getCartCount = () => {
    if (!cart || !Array.isArray(cart)) return 0; // ✅ Ensure cartItems is an array

    return cart.reduce((total, product) => {
      return total + (Number(product.quantity) || 0); // ✅ Directly sum up the quantity
    }, 0);
  };

  /*  remove from cart */
  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item._id === productId && item.size === size))
    );

  };

  // Increment Quantity
  const incrementQuantity = (productId, size) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement Quantity
  const decrementQuantity = (productId, size) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item._id === productId && item.size === size
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items if quantity is 0
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Product total price
  const getProductTotalPrice = (productId, size) => {
    const item = cart.find(
      (item) => item._id === productId && item.size === size
    );
    return item ? item.discountPrice * item.quantity : 0;
  };

  // Get total price
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + (item.discountPrice * item.quantity || 0),
      0
    );
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        "https://rogue0707.com/api/products/list"
      );
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const getUserCart = async (userId, token) => {
    try {
      const response = await axios.post(
        "https://rogue0707.com/api/cart/get",
        { userId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCart(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch cart");
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    selectedProduct,
    setSelectedProduct,
    addToCart,
    cart,
    setCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
    getProductTotalPrice,
    token,
    currency,
    setCurrency,
    setToken,
    navigate,
    getCartCount,
    updateQuantity,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;