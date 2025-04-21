import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: {
        ca: fs.readFileSync(process.env.DB_SSL_CERT)
      }
    });

    console.log("✅ Successfully connected to Azure MySQL with SSL!");
    await connection.end();
  } catch (err) {
    console.error("❌ SSL Connection failed:", err);
  }
}

testConnection();
