const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: [true, "Please provide a card number"],
    unique: true,
  },
  cvv: {
    type: String,
    required: [true, "Please provide a CVV"],
  },
  expiryDate: {
    type: String,
    required: [true, "Please provide an expiry date"],
  },
  cardHolderName: {
    type: String,
    required: [true, "Please provide a card holder name"],
  },
});

const CreditCard = mongoose.model("CreditCard", creditCardSchema);

module.exports = CreditCard;
