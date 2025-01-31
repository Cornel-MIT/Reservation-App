const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurantModel");


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

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); 
    res.status(200).json(restaurants); 
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
});

module.exports = router;