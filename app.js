// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

//require the middleware we created to check if the user is aythenticated and use it before the routes
const { isAuthenticated } = require("./middlewares/jwt.middleware");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

/* 
if(userLoggedIn) {
 next()
} else {
res.status(403).send("Unauthorized access") 
}
*/
//project routes
const projectRoutes = require("./routes/project.routes");
app.use("/api", isAuthenticated, projectRoutes);
// .../api/projects
// task routes
const taskRoutes = require("./routes/task.routes");
app.use("/api", isAuthenticated, taskRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// create a new task

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

// Application Programming Interface

//REST API - Representational State Transfer

// Decoupled from the client
// Stateless
// Uniform Interface
// JSON
