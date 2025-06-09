import userModel from "../models/userModel.js";

// Add product to cart controller
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    console.log("Received itemId:", itemId);

    if (!userId || !itemId || !size) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Find user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure cartData is an array
    let cartData = Array.isArray(userData.cartData) ? userData.cartData : [];
    console.log("Cart Data:", cartData);

    // Check if the item already exists in the cart
    let existingItem = cartData.find(
      (item) => item?._id?.toString() === itemId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity
    } else {
      cartData.push({ _id: itemId, size, quantity: 1 });
    }

    // Update user's cart in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );
    console.log("Updated Cart:", updatedUser.cartData);

    res.json({
      success: true,
      message: "Added to cart",
      cart: updatedUser.cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId || !itemId || !size || quantity === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Find user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure cartData is an array
    let cartData = userData.cartData || [];

    // Find existing item
    let existingItemIndex = cartData.findIndex(
      (item) => item._id.toString() === itemId && item.size === size
    );

    if (existingItemIndex !== -1) {
      if (quantity > 0) {
        cartData[existingItemIndex].quantity = quantity; // Update quantity
      } else {
        cartData.splice(existingItemIndex, 1); // Remove item if quantity is 0
      }
    } else if (quantity > 0) {
      cartData.push({ _id: itemId, size, quantity }); // Add new item
    }

    // Update user cart in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    res.json({
      success: true,
      message: "Cart Updated",
      cart: updatedUser.cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log(userData.cartData);

    res.json({ success: true, cart: userData.cartData || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addToCart, updateCart, getUserCart };