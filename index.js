const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect('mongodb+srv://disilvadavis56:n01sJaamg1nZPuBS@cluster0.xjp2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() =>
 console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define routes (books and authors)
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });