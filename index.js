const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({hi: "deploy app to heroku, test auto againe"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('listen to port 5000...')
})