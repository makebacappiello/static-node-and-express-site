// Load the express library to build server
const express = require("express");

// Load the projects array from data.json
const { projects } = require("./data.json");

// Create the app to be seen on the UI
const app = express();

// Set express to convert pug files to HTML
app.set("view engine", "pug");

// Use files from the public folder so the css will work
app.use("/static", express.static("public"));

// Home page route: runs when someone visits '/'
app.get("/", (req, res) => {
  // Fills index.pug with projects and sends back the HTML
  res.render("index", { projects });
});

// About page route: runs when someone visits /about
app.get("/about", (req, res) => {
  // Fills about.pug and sends back the HTML
  res.render("about");
});

// The :id will be the actual number in the URL
app.get("/project/:id", (req, res, next) => {
  // Pick up the exact project from the URL's id
  const project = projects[req.params.id];

  // If the project exists
  if (project) {
    // Fill project.pug with that one project and send the HTML back
    res.render("project", { project });
  } else {
    // Otherwise skip ahead to the 404 handler below
    next();
  }
});

// 404 handler: runs only if no route above matched the URL
app.use((req, res, next) => {
  // Make a kind error message
  const err = new Error(
    "Sorry, the page you entered cannot be found. Please try again"
  );
  // Identify it as a 404 (page not found) error
  err.status = 404;
  // Print the message and status in the terminal
  console.log(err.message, err.status);
  // Pass the error along to Express's error handling
  next(err);
});

// This is the port used for the UI
app.listen(3000, () => {
  // A message so that we will know it's working
  console.log("We are online and listening on port 3000");
});
