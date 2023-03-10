require("dotenv").config();

// âšī¸ Connects to the database
require("./db");

const express = require("express");
const app = express();

const { isAuthenticated } = require("./middleware/jwt.middleware");

// âšī¸ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// đ Start handling routes here

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes, isAuthenticated);

const gptRoutes = require('./routes/gpt.routes')
app.use('/', gptRoutes, isAuthenticated)
// â To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
