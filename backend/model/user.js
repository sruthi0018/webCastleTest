const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  refreshToken: String,
  phone: String,
  calledEvents: [String],
});

module.exports = mongoose.model("User", userSchema);
