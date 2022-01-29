const fs = require("fs");
const path = require("path");

function filterByQuery(query, notes) {
  let filteredResults = notes;

  if (query.title) {
    filteredResults = filteredResults.filter(
      (notes) => notes.title === query.title
    );
  }

  if (query.text) {
    filteredResults = filteredResults.filter(
      (notes) => notes.text === query.text
    );
  }

  return filteredResults;
}

function findById(id, notes) {
  const result = notes.filter((notes) => notes.id === id)[0];
  return result;
}

function createNewNote(body, notes) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes }, null, 2)
  );
  console.log(note);
  return note;
}

function validateNote(notes) {
  if (!notes.title || typeof notes.title !== "string") {
    return false;
  }
  if (!notes.text || typeof notes.text !== "string") {
    return false;
  }
}

module.exports = {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
};
