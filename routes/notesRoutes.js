const router = require('express').Router();
const path = require('path');
const fs = require('fs');
var { notes } = require('../db/db');
const unique_id = require('unique-id-key')

router.get('/notes', (req, res) => {
    res.json(notes)
});

router.post('/notes', (req, res) => {
    req.body.id = unique_id.AlphaNum(10);
    const note = req.body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    const newNotes = notes.filter(note => note.id !== req.params.id)
    notes = newNotes;
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(notes);
})

module.exports = router;