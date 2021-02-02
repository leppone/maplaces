const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
// Cors for enabling unmatching origins
app.use(cors());


// DB
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// Generate ID for item by scoreboard length
const generateId = () => {
  let scoreboard = db.get('scoreboard').value();
  const maxId = scoreboard.length > 0
    ? Math.max(...scoreboard.map(item => item.id))
    : 0;
  return maxId + 1;
}


app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM places_test');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
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


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port);
console.log(`Server running on port ${port}`);