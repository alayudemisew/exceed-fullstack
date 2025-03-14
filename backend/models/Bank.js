const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({
  value: { type: String, required: true },
});

module.exports = mongoose.model("Bank", BankSchema);
