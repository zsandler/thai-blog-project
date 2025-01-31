const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },

})

const Restaurant = mongoose.model('Restaurants', restaurantSchema);
module.exports = Restaurant;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurants: [restaurantSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;


