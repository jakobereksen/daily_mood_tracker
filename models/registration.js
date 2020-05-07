const mongoose = require("mongoose");

registerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("registration", registerSchema);