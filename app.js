const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("morgan");
const app = express();
const config = require("./config/database");

const UserRoute = require('./routes/user');
const RoomRoute = require('./routes/room');
const EquipmentRoute = require('./routes/equipment');
const ReserveRoute = require('./routes/reserve');

const uristring =
  process.env.MONGODB_URI || process.env.MONGOHQ_URL || config.database;

const port = process.env.PORT || 3001;

mongoose
  .connect(uristring)
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api/users", UserRoute);
app.use("/api/rooms", RoomRoute);
app.use("/api/equipments", EquipmentRoute);
app.use("/api/reserves", ReserveRoute);

// app.use(express.static(path.join(__dirname, "client", "dist")));
// app.use("/**", express.static(path.join(__dirname, "client", "dist")));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
