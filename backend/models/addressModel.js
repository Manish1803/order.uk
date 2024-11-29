const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Please provide an address"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
  state: {
    type: String,
    required: [true, "Please provide a state"],
  },
  country: {
    type: String,
    required: [true, "Please provide a country"],
  },
  pincode: {
    type: String,
    required: [true, "Please provide a pincode"],
  },
  phone: {
    type: String,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
