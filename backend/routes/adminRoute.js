const express = require("express");
const { addFood, adminLogin } = require("./../controllers/foodController");
const { adminMiddleware } = require("./../middleware/auth");

const router = express.Router();

router.post("/add", adminMiddleware, addFood);

module.exports = router;
