// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

const user = process.env.MONGO_USER_NAME;
const password = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://${user}:${password}@cluster0.9dkvy54.mongodb.net/?retryWrites=true&w=majority`

const MONGO_URI =
  url || "mongodb://127.0.0.1:27017/new-app";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
