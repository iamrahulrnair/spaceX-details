const Ship = require("./../models/shipsModel");

exports.getAllShip = (req, res, next) => {
  Ship.find()
    .then((result) => {
      res.status(200).render("ships/allShips", {
        title: "Ships",
        ships: result,
      });
    })
    .catch((err) => console.log(err));
};
exports.getOneShip = async (req, res, next) => {
  var ship = await Ship.findOne({ _id: req.params.id });
  if (!ship) {
    next(new Error("no ship found"));
  }
  res.status(200).render("ships/oneShip", {
    title: ship.name,
    ship,
  });
};
