const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

// Init express app with public folder
const app = express();
app.use(express.static('public'))
app.use(express.json());
// Cors for enabling unmatching origins
app.use(cors());

// DB variables
const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;
const table_name = 'places_test';
const pool = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// --- GET index html page ---
app.get('/', (req, res) => {
  // Sort results by score before returning
  res.sendFile(path.resolve('./public/index.html'));
});


// --- GET all items ---
app.get('/api/places', async (req, res) => {
  console.log('GET /api/places called');

  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${table_name} ;`);
    const results = { 'results': (result) ? result.rows : null};
    res.json(results);
    client.release();
  } 
  catch (err) {
    console.error(err);
    res.send(`Error ${err}`);
  }
});


// --- GET item using id ---
app.get('/api/places/:id', async (req, res) => {
  console.log('GET /api/places/<id> called');

  try {
    const id = req.params.id;
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${table_name} WHERE id = ${id};`);
    const results = { 'results': (result) ? result.rows : null};
    res.json(results);
    client.release();
  } 
  catch (err) {
    console.error(err);
    res.send(`Error ${err}`);
  }
});


// --- PUT modified item ---
app.put('/api/places/:id', async (req, res) => {
  console.log('PUT /api/places/<id> called');

  // Checking all items from request
  const {title, description, opening_hours, coordinates} = req.body;

  console.log(`Received data: 
    { 
      title: ${title}, 
      description: ${description}, 
      coordinates: ${coordinates},
      opening_hours: ${opening_hours}
    }`);

  try {
    const id = req.params.id;
    const client = await pool.connect();
    client.query(
      `UPDATE ${table_name} SET title = '${title}', description = '${description}',
        opening_hours = '${opening_hours}', coordinates = '${coordinates}' 
      WHERE id = ${id};`,
        (error) => {
          if (error) { throw error; }
          // If here, return ok
          res.status(200).json({ status: 'success', message: 'Item updated.' });
        }
    )

    client.release();
  } 
  catch (err) {
    console.error(err);
    res.send(`Error ${err}`);
  }
});


// --- POST item to database ---
app.post('/api/places', async (req, res) => {
  console.log('POST /api/places called');

  // Checking all items from request
  const {title, description, opening_hours, coordinates} = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title required' })
  }

  // Try inserting data
  try{
    const client = await pool.connect();
    client.query(
      `INSERT INTO ${table_name} (title, description, opening_hours, coordinates) 
      VALUES ( '${title}', '${description}', '${opening_hours}', '${coordinates}' );`,
      (error) => {
        if (error) { throw error; }
        // If here, return ok
        res.status(201).json({ status: 'success', message: 'Item added.' });
      }
    )
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send(`Error ${err}`);
  }
});


// --- DELETE selected item ---
app.delete('/api/places/:id', async (req, res) => {
  console.log('DELETE /api/places/<id> called');

  try {
    const id = req.params.id;
    const client = await pool.connect();
    client.query(`DELETE FROM ${table_name} WHERE id = ${id};`,
        (error) => {
          if (error) { throw error; }
          // If here, return ok
          res.status(200).json({ status: 'success', message: 'Item deleted.' });
        }
    )
    client.release();
  } 
  catch (err) {
    console.error(err);
    res.send(`Error ${err}`);
  }
});


app.listen(PORT);
console.log(`Server running on port ${PORT}`);