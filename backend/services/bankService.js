const Bank = require("../models/Bank");
const Branch = require("../models/Branch");

// Fetch all banks
const getAllBanks = async () => {
  return await Bank.find({}, "value"); // Only fetch the 'value' field
};

// Fetch branches by bank ID
const getBranchesByBankId = async (bankId) => {
  return await Branch.find({ bank_id: bankId }, "value"); // Only fetch the 'value' field
};

async function getBankById(id) {
  return await Bank.findById(id);
}

async function createBank(value) {
  return await Bank.create({ value });
}

async function updateBank(id, value) {
  return await Bank.findByIdAndUpdate(id, { value }, { new: true });
}

async function deleteBank(id) {
  return await Bank.findByIdAndDelete(id);
}

module.exports = {
  getAllBanks,
  getBranchesByBankId,
  getBankById,
  createBank,
  updateBank,
  deleteBank,
};
