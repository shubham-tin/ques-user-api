const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const redis = require("redis");
const response_time = require("response-time");
const axios = require("axios");

const app = express();
const mainRoute = require("./routes/main");
const secret = require("./config/secret");

// const connection = mysql.createConnection(secret.database);

// establish connection with mysql
// connection.connect(err => {
//   if (err) throw err;
//   console.log("database connected");
// });

var knex = require("knex")({
  client: "mysql",
  connection: secret.database
});
app.set("knex-client", knex);
// app.set("connection", connection);
app.use(bodyParser.urlencoded({ extended: true })); //complex algo for parsing
app.use(cookieParser());

const client = redis.createClient(secret.redis);
app.set("client", client);

client.on("ready", function() {
  console.log("Redis is ready");
});

client.on("error", err => {
  console.log("Error in redis");
});

app.use(response_time());

// make user variable available in all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(mainRoute);

// running app on port 3000
app.listen(secret.application_port, err => {
  if (err) {
    throw err;
  }
  console.log("server running");
});
