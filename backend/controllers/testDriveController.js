const TestDrive = require("../models/TestDrive");
const Car = require("../models/Car");


const createTestDrive = async (req, res) => {
  try {
    const { carId, name, phone, email, preferredDate } = req.body;

    if (!carId || !name || !phone || !email) {
      return res.status(400).json({ message: "Name, phone and email are required" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const cleanPhone = String(phone).replace(/[\s-]/g, "");
    if (!/^\+?\d{10,13}$/.test(cleanPhone)) {
      return res.status(400).json({ message: "Enter a valid phone number" });
    }

    await TestDrive.create({
      user: req.user._id, 
      car: car._id,
      name,
      phone: cleanPhone,
      email,
      preferredDate: preferredDate || undefined,
    });

    res.status(201).json({ message: "Test drive request received" });
  } catch (error) {
    res.status(400).json({ message: "Could not book test drive" });
  }
};

const getTestDrives = async (req, res) => {
  try {
    const drives = await TestDrive.find()
      .populate("car", "name brand")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = { createTestDrive, getTestDrives };