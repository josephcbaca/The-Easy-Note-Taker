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

let note = [];

// Routes
// This GET request from client "/"" and serves up index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

// This GET request from client "/notes" and serves up notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// This GET request from client "api/notes" and serves a result json from notes array
app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    let newNote = JSON.parse(data);
    note.push(newNote)
  });
  return res.json(note);
});

// This POST 
app.post("/api/notes", function (req, res) {

  //   let note = req.body
  //  console.log(addNotes)
    
    // newNote.title = content.title;
    // newNote.text = content.text;
    // console.log(content)
    // notes.push(newNote);
    res.json(note);
    // res.end(data);
});






// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});