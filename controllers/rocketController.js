const Rocket = require("./../models/rocketsModel");
const converter = require("number-to-words");
exports.getAllRocket = (req, res, next) => {
  Rocket.find()
    .then((result) => {
      res.status(200).render("rockets/allRockets", {
        title: "Rockets",
        rockets: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOneRocket = async (req, res, next) => {
  var rocket = await Rocket.findOne({ _id: req.params.id });
  if (!rocket) {
    next(new Error("no rocket found"));
  }

  let cost_per_launch = converter.toWords(rocket.cost_per_launch);
  res.status(200).render("rockets/oneRocket", {
    title: rocket.name,
    rocket,
    cost_per_launch,
  });
};
