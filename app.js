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

//TEMPORARY tester for the global error handler
app.get("/broken", (req, res, next) => {
  // an error with no status to purposely give it a 500
  const err = new Error("Warning!Warning! This is only a test.");
  //send it to the error handler
  next(err);
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

//the global error handler
app.use((err, req, res, next) => {
  // If the error has no status yet,then throw an error 500
  err.status = err.status || 500;
  // If the error has no message yet, show a friendly one
  err.message =
    err.message ||
    "Sorry, the page you entered cannot be found. Please try again";
  // send message and status to the console
  console.log(err.message, err.status);
  // Send back the right status code and show the message on UI
  res.status(err.status).send(err.message);
});

// This is the port used to show that the app is working and the UI will render
app.listen(3000, () => {
  // A message for the console as proof it works
  console.log("We are online and listening on port 3000");
});
