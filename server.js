// Dependencies
let express = require("express");
let path = require("path");
let fs = require("fs");

// Sets up the Express App
let app = express();
let PORT = 8080;

//Set up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This is a request for the static folder public
app.use(express.static(path.join(__dirname, "./public")))

// Routes
// This GET request from client "/" and serves up index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

// This GET request from client "/notes" and serves up notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// This GET request from client "api/notes" and serves a result json from notes array read from db.json
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"))
});

//This worked above doesnt, why?
app.post("/api/notes", function (req, res) {
  const notes = req.body;
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);
      data.push(notes);

      fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data), (err) => {
          if (err) throw err;
          return res.json(notes);
      });
  });
});

// Delete
app.delete("/api/notes/:id", function (req, res) {

  let clear = req.params.id;

  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) throw err;

    let newData = JSON.parse(data);

    let newNotes = newData.filter(note => note.id != clear);

    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNotes), (err) => {
      if (err) throw err;
      res.send(newNotes);
    });
  })
})

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});