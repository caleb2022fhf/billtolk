const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection Pool ikoresha 'test' database aho twashyize tables zacu
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USER || '3huHSfwqZrqE5Ro.root',
  password: process.env.DB_PASSWORD || '6basF0cUEHtv008T',
  database: 'test', 
  ssl: { 
    rejectUnauthorized: true 
  }
});

// 1. Route yo kugenzura niba Database ikora neza
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ success: true, message: 'Database connected successfully to test DB!', result: rows[0].solution });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Route yo kubona cyangwa kohereza Posts (Instagram style)
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json({ success: true, posts: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Route yo kohereza Ubutumwa bwa Chat
app.post('/api/messages', async (req, res) => {
  try {
    const { sender_id, receiver_id, message } = req.body;
    const [result] = await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
      [sender_id, receiver_id, message]
    );
    res.json({ success: true, messageId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('Billtolk Backend is running successfully!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Billtolk Backend is running on port ${PORT}`);
});
