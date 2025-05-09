const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneno: Number,
  usertype: String,
  password: String,
  address: String,
});

module.exports = mongoose.model("User", UserSchema);
