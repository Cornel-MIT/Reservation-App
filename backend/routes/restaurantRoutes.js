const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurantModel");

// Add a new restaurant
// router.post("/add", async (req, res) => {
//   try {
//     const restaurantData = req.body;
//     const newRestaurant = new Restaurant(restaurantData);
//     await newRestaurant.save();
//     res.status(201).json(newRestaurant);
//   } catch (error) {
//     console.error("Error saving restaurant:", error);
//     res.status(400).json({ message: error.message });
//   }
// });

router.post("/add", async (req, res) => {
  console.log("Received request body:", req.body); 
  try {
    const restaurantData = req.body;
    const newRestaurant = new Restaurant(restaurantData);
    await newRestaurant.save();
    console.log("Restaurant saved:", newRestaurant); 
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error("Error saving restaurant:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;