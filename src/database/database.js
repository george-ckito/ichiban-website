const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb+srv://george:loveArduino16@cluster0.okuau.mongodb.net/website?retryWrites=true&w=majority",
  {}
);
