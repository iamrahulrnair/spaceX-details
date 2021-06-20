const landPad = require("./../models/landpadsModel");

exports.getAllLandPad = (req, res, next) => {
  landPad
    .find()
    .then((result) => {
      res.status(200).render("landpads/allLandPads", {
        title: "all-LandPads",
        landPads: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOneLandpad = async (req, res, next) => {
  const landpad = await landPad.findOne({ _id: req.params.id });
  if (!landpad) {
    next(new Error("no landpad found"));
  }

  res.status(200).render("landpads/oneLandpad", {
    title: landpad.name,
    landpad: landpad,
  });
};
