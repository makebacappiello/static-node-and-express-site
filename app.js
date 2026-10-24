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

// Global error handler
app.use((err, req, res, next) => {
  // If error has no status run the 500 server error
  err.status = err.status || 500;

  // If error has no message show friendly one
  err.message = err.message || "Oops, seems like we made a doozy here!";

  // Send the message and status to the console
  console.log(err.message, err.status);

  // Set the status code on the response
  res.status(err.status);

  // If page not found...
  if (err.status === 404) {
    // ...show the page-not-found message and pass it the error
    res.render("page-not-found", { err });
  } else {
    // ...otherwise show the general error message and pass it the error
    res.render("error", { err });
  }
});

// This is the port used to show that the app is working and the UI will render
app.listen(3000, () => {
  // A message for the console as proof it works
  console.log("We are online and listening on port 3000");
});
