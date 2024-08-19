const express = require('express');
const router = express.Router();
const Author = require('../model/author');

// Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get author by ID
router.get('/:id', getAuthor, (req, res) => {
  res.json(res.author);
});

// Add a new author
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
    bio: req.body.bio,
  });

  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update author details
router.put('/:id', getAuthor, async (req, res) => {
  if (req.body.name != null) {
    res.author.name = req.body.name;
  }
  if (req.body.bio != null) {
    res.author.bio = req.body.bio;
  }

  try {
    const updatedAuthor = await res.author.save();
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete author
router.delete('/:id', getAuthor, async (req, res) => {
  try {
    await res.author.remove();
    res.json({ message: 'Deleted Author' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getAuthor(req, res, next) {
  let author;
  try {
    author = await Author.findById(req.params.id);
    if (author == null) {
      return res.status(404).json({ message: 'Cannot find author' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.author = author;
  next();
}

module.exports = router;
