const express = require('express')

const server = express()
server.use(
  express.json()
)


//Listening

const port = 3300;

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})