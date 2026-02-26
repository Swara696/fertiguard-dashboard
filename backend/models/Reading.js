const mongoose = require("mongoose");

const ReadingSchema = new mongoose.Schema({
  deviceId: String,
  ph: Number,
  turbidity: Number,
  flow: Number,
  timestamp: {
    type: Number,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Reading", ReadingSchema);