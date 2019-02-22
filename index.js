const express = require('express')
const cors = require('cors')

const server = express()
server.use(
  express.json(),
  cors()
)

//Routes
const notesRoute = require('./data/routes/notesRoute')
const authRoute = require('./data/routes/authRoute')

server.use('/notes/', notesRoute)
server.use('/auth/', authRoute)

//Listening

const port = 3300;

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})