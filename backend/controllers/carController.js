const Car = require("../models/Car");


const getCars = async (req, res) => {

  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } 
  
  catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }

};


const getCarById = async (req, res) => {

  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } 

  catch (error) {
    res.status(400).json({ message: "Invalid car id" });
  }

};


const addCar = async (req, res) => {

  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  }

   catch (error) {
    res.status(400).json({ message: error.message });
  }

};


const updateCar = async (req, res) => {

  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } 
  
  catch (error) {
    res.status(400).json({ message: error.message });
  }

};


const deleteCar = async (req, res) => {

  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted" });
  } 
  
  catch (error) {
    res.status(400).json({ message: "Invalid car id" });
  }
  
};

module.exports = { getCars, getCarById, addCar, updateCar, deleteCar };