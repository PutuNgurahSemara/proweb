const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const pool = require('./db');
app.use(cors());
app.use(express.json());

//GET route
app.get('/', (req, res) => {
    res.send('Hai dunia dari express!!');
});
//POST route
app.post('/data', (req, res) => {
    const { nama } = req.body;
res.send(`Data diterima: ${nama}`);
});

// CREATE
app.post('/produk', async (req, res) => {
    const { nama, harga } = req.body;
    try {
      const newProduk = await pool.query(
        'INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *',
        [nama, harga]
      );
      res.json(newProduk.rows[0]);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    }
   });

    // READ
 app.get('/produk', async (req, res) => {
    try {
    const allProduk = await pool.query('SELECT * FROM produk');
    res.json(allProduk.rows);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    }
    });

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});