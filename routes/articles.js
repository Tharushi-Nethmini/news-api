/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const router = express.Router();
const { 
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

// Create a new article
router.post('/', createArticle);

// Get all articles
router.get('/', getAllArticles);

// Get an article by ID
router.get('/:id', getArticleById);

// Update an article by ID
router.put('/:id', updateArticle);

// Delete an article by ID
router.delete('/:id', deleteArticle);

module.exports = router;
