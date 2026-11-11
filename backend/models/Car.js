const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    year: { type: Number, required: true },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
      default: "Petrol",
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      default: "Manual",
    },

    mileage: { type: Number },
    image: { type: String }, 
    description: { type: String },
  },

  { timestamps: true }

);

module.exports = mongoose.model("Car", carSchema);