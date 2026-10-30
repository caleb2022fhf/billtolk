const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 4000,
  user: process.env.DB_USER || 'HYHY_ANDIKA_USER_YAWE_HANO',       // Urugero: 3huHSfwqZrqE5Ro.root
  password: process.env.DB_PASSWORD || 'HYHY_ANDIKA_PASSWORD_YAWE_HANO', // Ijambo ry'ibanga rya TiDB
  database: 'test', 
  ssl: { rejectUnauthorized: true }
});

// 1. FRONTEND: Web page yerekana uko ikibazo gihagaze
app.get('/', async (req, res) => {
  try {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Billtolk 📸 - Debug</title>
          <style>
              body { font-family: sans-serif; margin: 0; background: #fafafa; display: flex; justify-content: center; padding: 20px; }
              .container { width: 100%; max-width: 480px; background: #fff; border: 1px solid #dbdbdb; padding: 20px; border-radius: 8px; }
              h2 { margin-top: 0; }
              .error-box { background: #ffe6e6; color: #cc0000; padding: 10px; border-radius: 5px; margin-top: 10px; font-size: 14px; word-break: break-all; }
              .success-box { background: #e6ffed; color: #006622; padding: 10px; border-radius: 5px; margin-top: 10px; }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Billtolk 📸 Debugger</h2>
              <p>Gukurikirana aho ikosa rivuye:</p>
              <div id="status" class="success-box">Checking connection...</div>
              <div id="feed" style="margin-top: 15px;"></div>
          </div>
          <script>
              fetch('/api/posts')
                  .then(res => res.json())
                  .then(data => {
                      const status = document.getElementById('status');
                      const feed = document.getElementById('feed');
                      if(data.success) {
                          status.className = 'success-box';
                          status.innerHTML = '<b>Database irakora neza! (Connected)</b>';
                          if(data.posts.length > 0) {
                              feed.innerHTML = data.posts.map(p => \`
                                  <div style="border: 1px solid #dbdbdb; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
                                      <strong>User: \${p.user_id}</strong>
                                      <p>\${p.caption || 'No caption'}</p>
                                  </div>
                              \`).join('');
                          } else {
                              feed.innerHTML = '<p>Nta posts ziri muri database.</p>';
                          }
                      } else {
                          status.className = 'error-box';
                          status.innerHTML = '<b>Database Error:</b> ' + data.error;
                      }
                  })
                  .catch(err => {
                      const status = document.getElementById('status');
                      status.className = 'error-box';
                      status.innerHTML = '<b>Fetch Error:</b> ' + err.message;
                  });
          </script>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`<h1>Server Render Error:</h1><pre>${err.message}</pre>`);
  }
});

// 2. BACKEND API: Gusoma Posts muri Database
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json({ success: true, posts: rows });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
