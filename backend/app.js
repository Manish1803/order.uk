const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const data = require("./config/data");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/food", require("./routes/foodRoute"));
app.use("/api/cart", require("./routes/cartRoute"));

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/data", (req, res) => {
  res.status(200).json(data);
});

module.exports = app;
