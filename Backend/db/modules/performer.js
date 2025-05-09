const mongoose = require('mongoose');

const performerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  category: String,
  rating: Number 
});

module.exports = mongoose.model("Performer", performerSchema);
