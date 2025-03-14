const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  value: { type: String, required: true },
  bank_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true,
  },
});

module.exports = mongoose.model("Branch", BranchSchema);
