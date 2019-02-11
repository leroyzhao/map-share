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
  //res.send({'body': req.body});
  res.send({'some kinda error!': req.body})
});

/////////////////////////RESTAURANTS///////////////////////////////

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

/////////////////////////REVIEWS///////////////////////////////

// user adds review
router.post('/reviews/:id', (req,res,next) => {
  res.send({type: 'POST REVIEW'});
});

// user edits review???
router.put('/reviews/:id', (req,res,next) => {
  res.send({type: 'PUT REVIEW'});
});

/////////////////////////MARKS///////////////////////////////

// get all marks to populate map
router.get('/marks', (req,res,next) => {
  res.send({type: 'GET all marks'});
});

/////////////////////////USER///////////////////////////////

// get all users???
router.get('/users', (req,res,next) => {
  res.send({type: 'GET all users'});
});

// add new user
router.post('/users/:userId', (req,res,next) => {
  res.send({type: 'POST user'});
});

/////////////////////////CUISINE///////////////////////////////

// provide options for cuisines?
router.get('/cuisines', (req,res,next) => {
  res.send({type: 'GET all cuisines'});
});

// get restaurants of specific cuisine
router.get('/cuisines/:cuisine', (req,res,next) => {
  res.send({type: 'GET restaurants of specific cuisine'});
});

/////////////////////////PRICE RANGE///////////////////////////////

// get restaurants of specific price range
router.get('/priceRanges/:priceRange', (req,res,next) => {
  res.send({type: 'GET restaurants of specific price range'});
});

/////////////////////////GROUPS////////////////////////////////////

//list groups
router.get('/groups', (req,res,next) => {
  res.send({type: 'GET list of group names'});
});

//list members of group
router.get('/groups/:groupId', (req,res,next) => {
  res.send({type: 'GET members of specific group'});
});

///////////////////////////////////////////////////////////////////

module.exports = router;