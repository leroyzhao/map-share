const HTTP_PORT = process.env.PORT || 3000;
const express = require("express");

//set up express app
const app = express();

// initialize routes
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(HTTP_PORT, () => {
  console.log('now listening for requests')
});