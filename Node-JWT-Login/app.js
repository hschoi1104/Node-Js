var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connect = require("connect");

var app = express();
var config = require("./config");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')))
app.use("/api", require("./routes/api"));

/**
 * Set JWT KEY
 */
app.set("jwt-secret", config.secret);

/**
 * Connect Mongodb
 */

var mongoose = require("mongoose");

var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

mongoose.connect(config.mongodbUri);

module.exports = app;
