const Branch = require("../models/Branch");

async function getAllBranches(bank_id) {
  return await Branch.find(bank_id ? { bank_id } : {}).populate(
    "bank_id",
    "value"
  );
}

async function getBranchById(id) {
  return await Branch.findById(id).populate("bank_id", "value");
}

async function createBranch(value, bank_id) {
  return await Branch.create({ value, bank_id });
}

async function updateBranch(id, value) {
  return await Branch.findByIdAndUpdate(id, { value }, { new: true });
}

async function deleteBranch(id) {
  return await Branch.findByIdAndDelete(id);
}

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};
