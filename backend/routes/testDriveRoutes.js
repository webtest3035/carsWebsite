const express = require("express");
const {  createTestDrive,  getTestDrives,  updateTestDriveStatus,  getMyTestDrives,  cancelMyTestDrive,
} = require("../controllers/testDriveController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createTestDrive);
router.get("/", protect, adminOnly, getTestDrives);
router.get("/my", protect, getMyTestDrives);
router.patch("/my/:id/cancel", protect, cancelMyTestDrive);
router.patch("/:id", protect, adminOnly, updateTestDriveStatus);

module.exports = router;