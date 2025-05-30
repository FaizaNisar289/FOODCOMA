import userModel from "../models/userModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!user.cartData) {
      user.cartData = {};
    }

    // Add or update item in the cart
    user.cartData[itemId] = (user.cartData[itemId] || 0) + (quantity || 1);

    await user.save();

    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    res.status(500).json({ success: false, message: "Error adding item to cart" });
  }
};

// Get cart items
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.cartData || !user.cartData.hasOwnProperty(itemId)) {
      console.log("Cart Data:", user.cartData);
      console.log("Item ID trying to remove:", itemId);
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    delete user.cartData[itemId];
    await user.save();

    res.json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    res.status(500).json({ success: false, message: "Error removing item from cart" });
  }
};
