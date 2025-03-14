const express = require("express");
const router = express.Router();
const bankService = require("../services/bankService");
const { authenticateUser } = require("../middleware/authMiddleware");

// GET /api/banks → Fetch list of available bank names
router.get("/banks", authenticateUser, async (req, res) => {
  try {
    const banks = await bankService.getAllBanks();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch banks" });
  }
});

// GET /api/branches?bank_id={id} → Fetch branches for a bank
router.get("/branches", authenticateUser, async (req, res) => {
  try {
    const { bank_id } = req.query;
    if (!bank_id) {
      return res.status(400).json({ error: "Bank ID is required" });
    }
    const branches = await bankService.getBranchesByBankId(bank_id);
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch branches" });
  }
});

// Get all banks
router.get("/", authenticateUser, async (req, res) => {
  try {
    const banks = await bankService.getAllBanks();
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bank by ID
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const bank = await bankService.getBankById(req.params.id);
    if (!bank) return res.status(404).json({ message: "Bank not found" });
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new bank
router.post("/", async (req, res) => {
  try {
    const { value } = req.body;
    const newBank = await bankService.createBank(value);
    res.status(201).json(newBank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update bank
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const updatedBank = await bankService.updateBank(
      req.params.id,
      req.body.value
    );
    if (!updatedBank)
      return res.status(404).json({ message: "Bank not found" });
    res.status(200).json(updatedBank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete bank
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const deletedBank = await bankService.deleteBank(req.params.id);
    if (!deletedBank)
      return res.status(404).json({ message: "Bank not found" });
    res.status(200).json({ message: "Bank deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
