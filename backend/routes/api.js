const express = require("express");
const router = express.Router();

// get list of restaurants from db
router.get('/restaurants', (req,res) => {
  res.send({type: 'GET'});
});

// add new restaurant to db
router.post('/restaurants', (req,res) => {
  console.log(req.body);
  res.send({
    type: 'POST',
    name: req.body.name,
    location: req.body.location
  });
});

// get restaurant from db
router.get('/restaurants/:id', (req,res) => {
  res.send({type: 'GET'});
});

// update restaurant in db
router.put('/restaurants/:id', (req,res) => {
  res.send({type: 'PUT'});
});

// delete restaurant in db
router.delete('/restaurants/:id', (req,res) => {
  res.send({type: 'DELETE'});
});

module.exports = router;