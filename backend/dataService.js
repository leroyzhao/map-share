const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const Restaurant = require('./models/restaurant');
const Cuisine = require('./models/cuisine');
const Mark = require('./models/mark');
const PriceRange = require('./models/priceRange');
const Review = require('./models/review');
const User = require('./models/user');

module.exports = () => {
  return {

    // ///// Function Outline! 
    // functionName: () => {
    //   return new Promise((resolve, reject) => {
    //     SchemaName.what()
    //     .then(data => {
    //       resolve(data)
    //     }).catch(err => {
    //       reject(err)
    //     });
    //   });
    // },

    getRestaurants: () => {
      return new Promise((resolve, reject) => {
        Restaurant.find()
        .then(data => {
          console.log('data retrieved?', data)
          resolve(data)
        }).catch(err => {
          console.log('ERROROROOR')
          reject(err)
        });
      });
    },

    getRestaurantById: (locationId) => {
      return new Promise((resolve, reject) => {

        // validate location ******ADD ! TO IMPLEMENT******
        // if (locationId.match(/^[0-9a-fA-F]{24}$/)) {
        //   reject('invalid id')
        // }

        Restaurant.find({ locationId })//: new mongoose.Types.ObjectId() })
          .exec()
          .then(data => {
            console.log('search results:', data)
            resolve(data)
          })
          .catch(err => {
            console.log('fail')
            reject(err)
        });

      });
    },



  }
}