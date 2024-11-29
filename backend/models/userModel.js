const mongoose = require("mongoose");
const validator = require("validator");

const CreditCard = require("./creditCardModel");
const Address = require("./addressModel");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  photo: String,
  gender: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  creditCard: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreditCard",
    },
  ],
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
