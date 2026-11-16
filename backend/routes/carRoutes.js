const express = require("express");
const { getCars, getCarById, addCar, updateCar, deleteCar, } = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, adminOnly, addCar);
router.put("/:id", protect, adminOnly, updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);

module.exports = router;