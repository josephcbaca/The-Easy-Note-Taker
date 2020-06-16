// Dependencies
let express = require("express");
let path = require("path");
let fs = require("fs");

// Sets up the Express App
let app = express();
let PORT = 8080;

//Set up the Express app to handle data parsing
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// This is a request for the static folder public
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
  fs.readFile(__dirname + "/db/db.json", function (err, data) {
    if (err) throw err;
    const content = data.toString()
    let newN
    // res.end(data);
  });
  // return res.json(notes);
});

app.post("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", function (err, data) {
    if (err) throw err;
    const content = data.toString()
    let newNote = req.body;
    newNote.title = content.title;
    newNote.title = content.text;
    // res.end(data);
  });
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.title = "test" 
  newNote.text =  "text"
  // newNote.name.replace(/\s+/g, "").toLowerCase();


  res.json(newNote);
});

// POST a note - takes in JSON input


// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});