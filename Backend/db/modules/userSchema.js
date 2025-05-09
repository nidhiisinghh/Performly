const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneno: Number,
  password: String,
  address: String,
});

module.exports = mongoose.model("User", userSchema);
