//Env
require("dotenv").config();
const env = process.env;

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();

//Logger
const Logger = require("./utils/Logger.js");

//Routes
const routes = require("./routes/index.js");

//MongoDB Connection
let mongoURL = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/?authMechanism=DEFAULT`;
if (env.MONGO_AUTH_REQUIRED == "false") {
  mongoURL = `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}`;
}

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(parseInt(env.SERVER_PORT), () => {
  console.clear();
  console.log();

  Logger.dividerMagenta();
  Logger.serverStart("127.0.0.1", env.SERVER_PORT);
  Logger.mongoStart(mongoURL);
  Logger.dividerMagenta();
});
