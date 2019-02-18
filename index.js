const express = require('express')

const server = express()
server.use(
  express.json()
)

//Routes
const notesRoute = require('./data/routes/notesRoute')

server.use('/notes', notesRoute)

//Listening

const port = 3300;

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})