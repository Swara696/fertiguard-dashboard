const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema({
  deviceId: String,
  action: String,
  value: Boolean,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Command", CommandSchema);