const express = require("express");
const router = express.Router();
const applicationService = require("../services/applicationService");

// POST /api/applications/submit → Submits the application
router.post("/applications/submit", async (req, res) => {
  try {
    const { bank_name, branch_name, account_name, account_number } = req.body;

    console.log("req.body: ", req.body);
    // Validate required fields
    if (!bank_name || !branch_name || !account_name || !account_number) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const application = await applicationService.submitApplication({
      bank_name,
      branch_name,
      account_name,
      account_number,
    });

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
});

module.exports = router;
