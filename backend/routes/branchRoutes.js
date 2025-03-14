const express = require("express");
const router = express.Router();
const branchService = require("../services/branchService");

// Get all branches or filter by bank_id
router.get("/", async (req, res) => {
  try {
    const branches = await branchService.getAllBranches(req.query.bank_id);
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get branch by ID
router.get("/:id", async (req, res) => {
  try {
    const branch = await branchService.getBranchById(req.params.id);
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new branch
router.post("/", async (req, res) => {
  try {
    const { value, bank_id } = req.body;
    const newBranch = await branchService.createBranch(value, bank_id);
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update branch
router.put("/:id", async (req, res) => {
  try {
    const updatedBranch = await branchService.updateBranch(
      req.params.id,
      req.body.value
    );
    if (!updatedBranch)
      return res.status(404).json({ message: "Branch not found" });
    res.status(200).json(updatedBranch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete branch
router.delete("/:id", async (req, res) => {
  try {
    const deletedBranch = await branchService.deleteBranch(req.params.id);
    if (!deletedBranch)
      return res.status(404).json({ message: "Branch not found" });
    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
