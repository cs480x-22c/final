const express = require('express')
const cors = require('cors');

const app = express()
const port = 3000

app.use(cors())
app.use(express.static('processed'))

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})