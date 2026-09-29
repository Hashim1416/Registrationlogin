const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
require('./data/db'); // Initialize SQLite DB

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use((req, res) =>
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
