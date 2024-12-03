const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("./../controllers/cartController");
const { authMiddleware } = require("./../middleware/auth");

const router = express.Router();

router.get("/get", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);

// router.post("/:userId/share", generateSharedCart);
// router.get("/shared-cart/:sharedCartId", getSharedCart);

module.exports = router;
