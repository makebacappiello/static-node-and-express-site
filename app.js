const express = require("express"); // Load the express library to build server
const { projects } = require("./data.json"); //losd the projects arr from data.json

const app = express(); //create the app to be seen on the UI

app.set("view engine", "pug"); //set the expres to convert pug files to HTML

app.use("/static", express.static("public")); // use files from the public folde so that the css will work

app.get("/", (req, res) => {
  //When someone visits this root route it will direct them to the home page

  res.render("index", { projects }); // fills the index.pug files with projects and sends back the HTML
});

app.get("/about", (req, res) => {
  res.render("about");
});

//the id will be used for the actual number in the URL
app.get("/project/:id", (req, res) => {
  //picking up the exact id'd project from the url
  const project = projects[req.params.id];
  // fills the project.pug file with that one project and send the HTML back
  res.render("project", { project });
});

//this will be the port used for the UI
app.listen(3000, () => {
  //A message so that we will know its working
  console.log("We are online and listening on port 3000");
});
