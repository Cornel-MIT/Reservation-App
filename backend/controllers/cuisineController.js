const Cuisine = require('../models/Cuisine');
const Admin = require('../models/Admin');

const createCuisine = async (req, res) => {
  const { name, restaurant, location, pictures, reservationTypes } = req.body;
  const adminId = req.user.id;

  try {
    const cuisine = new Cuisine({
      name,
      restaurant,
      location,
      pictures,
      reservationTypes,
      admin: adminId,
    });
    await cuisine.save();

    // Link restaurant to admin
    const admin = await Admin.findById(adminId);
    admin.cuisines.push(cuisine._id);
    await admin.save();

    res.status(201).send(cuisine);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    res.send(cuisines);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { createCuisine, getCuisines };
