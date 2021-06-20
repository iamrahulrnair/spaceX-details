const mongoose = require("mongoose");
const rocketsSchema = new mongoose.Schema({
  height: {
    meters: Number,
    feet: Number,
  },
  diameter: {
    meters: Number,
    feet: Number,
  },
  mass: {
    kg: Number,
    lb: Number,
  },
  reusable: Boolean,
  second_stage: {
    engines: Number,
  },
  flickr_images: [],
  name: String,
  active: Boolean,
  cost_per_launch: Number,
  first_flight: Date,
  wikipedia: String,
  description: String,
  id: String,
});

rocketsSchema.pre(/^find/, async function (next) {
  console.log(this);
  // this.find({ active: { $ne: false } });
  next();
});

const Rocket = mongoose.model("Rockets", rocketsSchema);
module.exports = Rocket;
