const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../../lib/notes");
let { notes } = require("../../db/db.json");
const fs = require("fs");

//gets all notes
router.get("/notes", (req, res) => {
  let results = notes;
  if ((req, res)) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//gets a note per id
router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  console.info("delete");
  const result = req.params.id;

  let filteredResult = notes.filter(function (note) {
    return note.id != result;
  });
  notes = { notes: filteredResult };
  let parsedNotes = JSON.stringify(notes);
  notes = filteredResult;

  fs.writeFileSync(__dirname + "/../../db/db.json", parsedNotes, (err) => {
    if (err) throw err;
  });

  res.end();
});
module.exports = router;
