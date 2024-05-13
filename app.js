// app.js
require('dotenv').config();
const express = require('express');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoriesRoutes');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // for parsing application/json

app.use('/api', mainRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/news', newsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

