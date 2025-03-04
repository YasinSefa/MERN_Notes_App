const express = require('express')
const NoteModel = require('../models/noteModel');
const { createNote } = require('../controllers/noteController');
const { getNotes } = require('../controllers/noteController');
const { getNoteById } = require('../controllers/noteController');
const { deleteNoteById } = require('../controllers/noteController');
const { editNoteById } = require('../controllers/noteController');
const router = express.Router();

router.get('/', getNotes)

router.get('/:id', getNoteById)

router.post('/', createNote)

router.delete('/:id', deleteNoteById)

router.patch('/:id', editNoteById)
module.exports = router;