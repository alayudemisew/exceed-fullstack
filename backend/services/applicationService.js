const Application = require("../models/Application");

// Submit a new application
const submitApplication = async ({
  bank_name,
  branch_name,
  account_name,
  account_number,
}) => {
  const newApplication = new Application({
    bank_name,
    branch_name,
    account_name,
    account_number,
    status: "Submitted", // Default status on submission
  });

  return await newApplication.save();
};

module.exports = { submitApplication };
