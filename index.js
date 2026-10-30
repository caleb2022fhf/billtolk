const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection Pool ikoresha 'test' database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USER || '3huHSfwqZrqE5Ro.root',
  password: process.env.DB_PASSWORD || '6basF0cUEHtv008T',
  database: 'test', 
  ssl: { rejectUnauthorized: true }
});

// 1. FRONTEND: Web page yose iri hano muri Backend
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Billtolk 📸</title>
        <style>
            body { font-family: sans-serif; margin: 0; background: #fafafa; display: flex; justify-content: center; }
            .container { width: 100%; max-width: 480px; min-height: 100vh; background: #fff; border: 1px solid #dbdbdb; padding-bottom: 60px; }
            header { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #dbdbdb; background: #fff; position: sticky; top: 0; }
            h2 { margin: 0; }
            .feed { padding: 10px; }
            .post { border: 1px solid #dbdbdb; border-radius: 8px; margin-bottom: 15px; padding: 10px; background: #fff; }
            nav { display: flex; justify-content: space-around; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #dbdbdb; height: 50px; align-items: center; max-width: 480px; margin: 0 auto; }
            nav span { cursor: pointer; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h2>Billtolk 📸</h2>
                <div>💬 ❤️</div>
            </header>
            <div class="feed" id="feed">
                <p style="text-align: center; color: #666;">Loading posts from database...</p>
            </div>
            <nav>
                <span>🏠 Home</span>
                <span>🔍 Search</span>
                <span>➕ Post</span>
                <span>✉️ Chat</span>
                <span>👤 Profile</span>
            </nav>
        </div>
        <script>
            fetch('/api/posts')
                .then(res => res.json())
                .then(data => {
                    const feed = document.getElementById('feed');
                    if(data.success && data.posts.length > 0) {
                        feed.innerHTML = data.posts.map(p => `
                            <div class="post">
                                <strong>User ID: ${p.user_id}</strong>
                                <p>${p.caption || 'No caption'}</p>
                            </div>
                        `).join('');
                    } else {
                        feed.innerHTML = '<p style="text-align: center; color: #666;">Nta posts zirahari muri database.</p>';
                    }
                })
                .catch(err => {
                    document.getElementById('feed').innerHTML = '<p style="text-align: center; color: red;">Error loading posts.</p>';
                });
        </script>
    </body>
    </html>
  `);
});

// 2. BACKEND API: Gusoma Posts muri Database ya TiDB
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json({ success: true, posts: rows });
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Gukora Localhost cyangwa Export kuri Serverless (Nka Vercel)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Billtolk is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
