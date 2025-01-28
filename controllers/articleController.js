/* eslint-disable @typescript-eslint/no-require-imports */
const Article = require('../models/Article');

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);  // Respond with status 201 (created)
  } catch (error) {
    res.status(400).json({ error: error.message });  // Bad request if something goes wrong
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });  // Sort articles by creation date (newest first)
    res.status(200).json(articles);  // Respond with status 200 (OK)
  } catch (error) {
    res.status(500).json({ error: error.message });  // Internal server error
  }
};

// Get an article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });  // If article doesn't exist
    }
    res.status(200).json(article);  // Respond with the article
  } catch (error) {
    res.status(500).json({ error: error.message });  // Internal server error
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }  // Return the updated article
    );
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);  // Respond with the updated article
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
