const express = require('express')
const app = express()
const port = 3000

var apis = require('./routes/apis');

app.use('/apis', apis);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})