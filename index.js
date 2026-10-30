const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection Pool ikoresha amakuru ya TiDB Cloud
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USER || '3huHSfwqZrqE5Ro.root',
  password: process.env.DB_PASSWORD || '6basF0cUEHtv008T',
  database: process.env.DB_NAME || 'sys',
  ssl: { rejectUnauthorized: true }
});

// Route yo gusangiza cyangwa gukora posts (Instagram style)
app.get('/api/posts', async (req, res) => {
  try {
    // Hano wahuza na Table ya database, urugero rw'ibanze:
    res.json([{ id: 1, username: "user_billtolk", caption: "My first post on Billtolk!", image: "https://via.placeholder.com/400" }]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.kt = app.listen(PORT, () => {
  console.log(`Billtolk Backend is running on port ${PORT}`);
});
