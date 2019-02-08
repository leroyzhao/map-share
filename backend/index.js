const HTTP_PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes/api');

//set up express app
const app = express();

// body parsing middleware
app.use(bodyParser.json())

// initialize routes
app.use('/api', routes);

// listen for requests
app.listen(HTTP_PORT, () => {
  console.log('now listening for requests')
});