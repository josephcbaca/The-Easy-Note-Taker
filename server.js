// Dependencies
let express = require("express");
let path = require("path");

// Sets up the Express App
let app = express();
let PORT = 8080;

//Set up the Express app to handle data parsing
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// This is a request for a static file
app.use(express.static(path.join(__dirname, "./public")))

let notes = [];

// Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// Displays all characters
app.get("/api/notes", function (req, res) {
  return res.json(notes);
});

app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.id = "1"
  newNote.title = "test"
  // newNote.name.replace(/\s+/g, "").toLowerCase();

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

// POST a note - takes in JSON input


// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});