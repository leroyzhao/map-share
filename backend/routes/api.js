const express = require("express");
const router = express.Router();
const Restaurant = require('../models/restaurant');

// get list of restaurants from db
router.get('/restaurants', (req,res) => {
  res.send({type: 'GET'});
});

// add new restaurant to db
router.post('/restaurants', (req,res,next) => {
  Restaurant.create(req.body).then((restaurant) => {
    res.send(restaurant);
  }).catch(next);
});

// get restaurant from db
router.get('/restaurants/:id', (req,res,next) => {
  res.send({type: 'GET'});
});

// update restaurant in db
router.put('/restaurants/:id', (req,res,next) => {
  res.send({type: 'PUT'});
});

// delete restaurant in db
router.delete('/restaurants/:id', (req,res,next) => {
  console.log('delete restaurant with id: ', req.params.id);
  Restaurant.findByIdAndRemove({_id: req.params.id}).then((restaurant) => {
    res.send(restaurant);
  });
  res.send({type: 'DELETE'});
});

module.exports = router;