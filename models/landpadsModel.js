const mongoose = require("mongoose");

const landPadsSchema = new mongoose.Schema({
  name: String,
  full_name: String,
  locality: String,
  region: String,
  latitude: String,
  longitude: String,
  landing_attempts: String,
  landing_success: String,
  wikipedia: String,
  details: String,
  launches: [],
  status: String,
  id: String,
});

const landPad = mongoose.model("landPads", landPadsSchema);
module.exports = landPad;
