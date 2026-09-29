const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database('./database.db');

// Initialize database table and sample data on startup
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS AppSettings (AppDate_old TEXT)");
  db.run("INSERT INTO AppSettings (AppDate_old) VALUES ('09/09/2026')");
});

// Final Migration Endpoint: Migrates & standardizes column name
app.post('/api/migrate/appdate', (req, res) => {
  db.serialize(() => {
    // 1. Add standardized column
    db.run("ALTER TABLE AppSettings ADD COLUMN AppDate TEXT", (err) => {
      if (err && !err.message.includes('duplicate column')) {
        return res.status(500).json({ success: false, error: err.message });
      }
      
      // 2. Populate AppDate from AppDate_old
      db.run("UPDATE AppSettings SET AppDate = AppDate_old WHERE AppDate IS NULL", (err) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }

        res.status(200).json({ 
          success: true, 
          message: 'AppDate migration and schema standardization completed.' 
        });
      });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Offline SQLite migration endpoint running at http://localhost:${PORT}`);
});