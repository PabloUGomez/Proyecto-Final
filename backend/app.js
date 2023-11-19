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
const mongoURL = `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware
app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(parseInt(env.SERVER_PORT), () => {
  console.clear();
  Logger.dividerMagenta();
  Logger.serverStart("127.0.0.1", env.SERVER_PORT);
  Logger.mongoStart(mongoURL);
  Logger.dividerMagenta();
});
