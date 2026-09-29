const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// Database configuration (Local / Offline DB)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'tradexpress_db'
};

// POST Endpoint to execute the migration
app.post('/api/migrate/appdate', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // Step 1: Add new column
    await connection.query('ALTER TABLE AppSettings ADD COLUMN AppDate_new DATETIME');

    // Step 2: Convert and populate data from AppDate_old
    await connection.query("UPDATE AppSettings SET AppDate_new = STR_TO_DATE(AppDate_old, '%m/%d/%Y')");

    // Step 3: Drop old column and rename new column
    await connection.query('ALTER TABLE AppSettings DROP COLUMN AppDate_old');
    await connection.query('ALTER TABLE AppSettings RENAME COLUMN AppDate_new TO AppDate');

    res.status(200).json({ 
      success: true, 
      message: 'AppDate migration completed successfully.' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  } finally {
    if (connection) await connection.end();
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Offline migration endpoint running at http://localhost:${PORT}`);
});