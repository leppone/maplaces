const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


app.use(express.json());
// Cors for enabling unmatching origins
app.use(cors());


// Generate ID for item by scoreboard length
const generateId = () => {
  let scoreboard = db.get('scoreboard').value();
  const maxId = scoreboard.length > 0
    ? Math.max(...scoreboard.map(item => item.id))
    : 0;
  return maxId + 1;
}

// GET all items sorted by score
app.get('/', (req, res) => {
  // Sort results by score before returning
  const hello = "hello world"
  res.json(hello);
})


app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM places_test');
    const results = { 'results': (result) ? result.rows : null};
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})


// GET all items sorted by score
app.get('/api/scoreboard', (req, res) => {
  console.log('GET /api/scoreboard called');
  const scoreboard = db.get('scoreboard').value();

  // Init scoreboard if empty
  if( scoreboard === undefined) {
    db.defaults({ scoreboard: [] });
  }

  // Sort results by score before returning
  const sortedResults = scoreboard.sort((a, b) => b.score - a.score);
  res.json(sortedResults);
})

// GET amount of items in scoreboard
app.get('/api/scoreboard/size', (req, res) => {
  const scoreboard = db.get('scoreboard').value();
  res.json(scoreboard.length);
})


// // GET streaming amount of items in scoreboard
// app.get('/api/scoreboard/stream', (req, res) => {
//   console.log('GET /api/scoreboard/stream called');
//   const scoreboard = db.get('scoreboard').value();
//   // Setting up event-stream response
//   res.set({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",

//     // enabling CORS
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers":
//     "Origin, X-Requested-With, Content-Type, Accept",  
//   });

//   // Create eventInterval for streaming
//   let eventInterval = setInterval(() => {
//     res.write(`event: message\n`);
//     res.write(`data: ${JSON.stringify(scoreboard)}\n\n`);
//   }, 2000);

//   // Create eventInterval for streaming
//   req.on("close", (err) => {
//     clearInterval(eventInterval);
//     res.end(); 
//   });
// })


// POST item to database
app.post('/api/scoreboard', (req, res) => {
  console.log('POST /api/scoreboard called')
  const body = req.body;

  // Checking all required items exist
  if (!body.name || !body.score) {
    return response.status(400).json({ 
      error: 'Name or score missing'
    })
  }

  // Create item from request body
  const item = {
    name: body.name,
    score: body.score,
    id: generateId()
  }

  // Add item to "database"
  db.get('scoreboard')
    .push(item)
    .write();

  // Send ok response
  res.json(item);
})

app.listen(PORT);
console.log(`Server running on port ${PORT}`);