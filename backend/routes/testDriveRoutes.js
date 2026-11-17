const express = require("express");
const { createTestDrive, getTestDrives } = require("../controllers/testDriveController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createTestDrive);
router.get("/", protect, adminOnly, getTestDrives);

module.exports = router;