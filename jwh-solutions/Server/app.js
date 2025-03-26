const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Database Connection
async function testDatabaseConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to JWH Solutions Warehouse Management System' });
});

// You'll add more routes here in future
// Example: app.use('/api/clients', clientRoutes);
// Example: app.use('/api/warehouses', warehouseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  testDatabaseConnection();
});

module.exports = app;