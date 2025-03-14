const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    bank_name: { type: String, required: true },
    branch_name: { type: String, required: true },
    account_name: { type: String, required: true },
    account_number: { type: String, unique: true, required: true },
    status: { type: String, enum: ["Draft", "Submitted"], default: "Draft" },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Application", ApplicationSchema);
