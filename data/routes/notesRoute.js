const express = require('express')
const router = express.Router()

const db = require('../helpers/db')

// Endpoints

// Get all notes
router.get('/', (req, res) => {
  db.getNotes()
    .then(notes => {
      res
        .status(200)
        .json(notes)
    })
    .catch(() => {
      res
        .status(500)
        .json({message: 'Failed to get notes'})
    })
})

// Get specific note
router.get('/:id', (req, res) => {
  const {id} = req.params
  db.getNotes(id)
    .then(note => {
      if(note) {
        res
          .status(200)
          .json(note)
      } else {
        res
          .status(404)
          .json({message: 'No note under current id'})
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({message: 'Failed to get note'})
    })
})

// Add new note
router.post('/', (req, res) => {
  const note = req.body
  if(note.title && note.textBody) {
    db.addNote(note)
      .then(newNote => {
        res
          .status(201)
          .json(newNote)
      })
      .catch(() => {
        res
          .status(500)
          .json({message: 'Failed to add note'})
      })
  } else {
    res
      .status(400)
      .json({message: 'Missing note title/body'})
  }
})

// Edit note
router.put('/:id', (req,res) => {
  const {id} = req.params
  const note = req.body
  if(note.title && note.textBody) {
    db.updateNote(id, note)
      .then(updatedNote => {
        res
          .status(201)
          .json(updatedNote)
      })
      .catch(() => {
        res
          .status(500)
          .json({message: 'Failed to update note'})
      })
  } else {
    res
      .status(400)
      .json({message: 'Missing note title/body'})
  }
})

// Delete note
router.delete('/:id', (req,res) => {
  db.deleteNote(id)
    .then(count => {
      res
        .status(200)
        .json({message: `${count} note/s removed`})
    })
    .catch(() => {
      res
        .status(500)
        .json({message: 'Failed to delete note'})
    })
})

module.exports = router