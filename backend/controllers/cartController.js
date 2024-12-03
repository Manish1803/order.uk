const User = require("../models/userModel");

exports.addToCart = async (req, res) => {
  try {
    let userData = await User.findById({ _id: req.body.userId });
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
    });
  }
};
