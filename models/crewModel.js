const mongoose = require("mongoose");
const slugify = require("slugify");
const crewSchema = new mongoose.Schema({
  name: String,
  agency: String,
  image: String,
  wikipedia: String,
  launches: [],
  slug: String,
  status: String,
  id: String,
});

crewSchema.pre(/^find/, function (next) {
  // console.log(this.find());
  this.find().select("-id -__v -launches");
  next();
});
crewSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Crew = mongoose.model("Crew", crewSchema);
module.exports = Crew;
