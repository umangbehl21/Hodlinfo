const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',        
    host: 'localhost',
    password: process.env.DB_PASSWORD,    
    port: 5432,              
});

async function createDatabase() {
    try {
        await pool.connect();
        const result = await pool.query('CREATE DATABASE hodlinfo');
        console.log('Database created successfully:', result);
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {

        await pool.end();
    }
}


async function createTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS hodlinfo (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                last VARCHAR(50),
                buy VARCHAR(50),
                sell VARCHAR(50),
                volume VARCHAR(50),
                base_unit VARCHAR(50)
            );
        `;
        const result = await pool.query(query);
        console.log('Table created successfully:', result);

    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await pool.end();
    }
}

// createTable()


// Function to connect to the database
async function connectToDatabase() {
    try {
        // Connect to PostgreSQL
        await pool.connect();
        console.log('Connected to PostgreSQL database successfully.');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
}

module.exports = {createDatabase,connectToDatabase,pool};
