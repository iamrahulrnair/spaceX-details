const Crew = require("./../models/crewModel");

exports.getAllCrew = (req, res, next) => {
  Crew.find().then((result) => {
    res.render("crew/allcrew", {
      crews: result,
      title: "Crew Members",
    });
  });
};

exports.getOneCrew = async (req, res, next) => {
  const crew = await Crew.findOne({ slug: req.params.slug });
  if (!crew) {
    next(new Error("no Crew found"));
  }
  res.status(200).render("crew/oneCrew", {
    title: crew.slug,
    crew: crew,
  });
};
