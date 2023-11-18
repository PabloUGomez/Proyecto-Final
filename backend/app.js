const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();
const SERVER_PORT = 3000;

//Routes
const routes = require("./routes/index.js");

//MongoDB Connection
const dbHOST = "127.0.0.1";
const dbURI = `mongodb://${dbHOST}:27017`;
const dbName = "database_todolist";

mongoose.connect(`${dbURI}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Evento cuando la conexión es exitosa
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB at ${dbURI}/${dbName}`);
});

// Evento cuando hay un error en la conexión
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Evento cuando la conexión se cierra
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//Middleware
app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(SERVER_PORT, () =>
  console.log(`Server start at port ${SERVER_PORT}`)
);
