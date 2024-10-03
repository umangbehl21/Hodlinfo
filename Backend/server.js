const express = require('express');
const app = express();
const port = 3000; 
const {createDatabase,connectToDatabase,createTable,pool} = require('./dbConnection')  
const axios = require('axios')
app.use(express.json());

createDatabase()
connectToDatabase()
createTable()

app.post('/api/add/data', async (req, res) => {
    try {
        
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = response.data;

        
        const top10Data = Object.keys(data).slice(0, 10).map(key => ({
            name: data[key].name,
            last: data[key].last,
            buy: data[key].buy,
            sell: data[key].sell,
            volume: data[key].volume,
            base_unit: data[key].base_unit
        }));

        for (const item of top10Data) {
            await pool.query(
                'INSERT INTO hodlinfo (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
                [item.name, item.last, item.buy, item.sell, item.volume, item.base_unit]
            );
        }

        res.send('Top 10 records have been stored successfully!');
    } catch (error) {
        console.error('Error fetching or storing data:', error);
        res.status(500).send('Error fetching or storing data');
    }
});

app.get('/api/top/results', async (req, res) => {
    try {
        const query = 'SELECT * FROM public.hodlinfo LIMIT 10'; // Get top 10 rows
        const { rows } = await pool.query(query); // Execute the query
        res.json(rows); // Send the data as JSON
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send('Hodlinfo API is running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
