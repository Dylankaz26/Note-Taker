const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for /api/notes
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

// GET by ID Route for /api/notes
app.get("/api/notes/:id", function (req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes[Number(req.params.id)]);
  });

  app.get("/api/notes/:id", function (req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes[Number(req.params.id)]);
  });

// POST route /api/notes
app.post("/api/notes", function (req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = notes.length.toString();
    newNote.id = uniqueID;
    notes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    console.log("Note saved to db.json. ");
    res.json(notes);
    });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);