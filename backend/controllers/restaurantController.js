const Restaurant = require('../models/Restaurant');
const Admin = require('../models/Admin');

const createRestaurant = async (req, res) => {
  const { name, place, hours, pictures, reservationTypes } = req.body;
  const adminId = req.user.id;

  try {
    const restaurant = new Restaurant({
      name,
      place,
      hours,
      pictures,
      reservationTypes,
      admin: adminId,
    });
    await restaurant.save();

    // Link restaurant to admin
    const admin = await Admin.findById(adminId);
    admin.restaurants.push(restaurant._id);
    await admin.save();

    res.status(201).send(restaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.send(restaurants);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { createRestaurant, getRestaurants };
