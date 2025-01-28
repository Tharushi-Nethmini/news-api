/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const articlesRouter = require('./routes/articles');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',  // replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
    // Can customize CORS if needed, see above
app.use(express.json());  // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send("ello world")
})

// Routes
app.use('/api/articles', articlesRouter);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Basic Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
