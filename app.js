const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const crewRouter = require("./routes/crewRoute");
const landPadsRouter = require("./routes/landPadsRoute");
const rocketRouter = require("./routes/rocketRoute");
const shipRouter = require("./routes/shipRoute");
const userRouter = require("./routes/userRoutes");
const morgan = require("morgan");

// ##
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// ##
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.get("/", (req, res, next) => {
  res.status(200).render("index", {
    title: "welcome to main page",
  });
});

app.use("/users", userRouter);
app.use("/crew-details", crewRouter);
app.use("/landPads-details", landPadsRouter);
app.use("/rockets-details", rocketRouter);
app.use("/ships-details", shipRouter);

app.all("*", (req, res, next) => {
  next("error 404");
});

// gloabal error handling middleware

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).sendFile(`${__dirname}/error-webView/error404.html`);
});
module.exports = app;
