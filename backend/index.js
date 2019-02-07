const express = require("express");
const HTTP_PORT = process.env.PORT || 4000;

//set up express app
const app = express();

// listen for requests
app.listen(HTTP_PORT, () => {
  console.log('now listening for requests')
});