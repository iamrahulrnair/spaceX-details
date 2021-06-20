const mongoose = require("mongoose");

const shipSchema = new mongoose.Schema({
  legacy_id: String,
  type: String,
  roles: [],
  mass_kg: Number,
  home_port: String,
  link: String,
  image: String,
  name: String,
  active: Boolean,
});
const Ship = mongoose.model("Ships", shipSchema);
module.exports = Ship;
