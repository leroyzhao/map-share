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

    // add mark and restaurant with common locationId
    addRestaurant: (restuarantData) => {
      return new Promise((resolve, reject) => {

        let commonId = ''
        console.log('body data: ', restuarantData)

        Mark.create({
          locationId: new mongoose.Types.ObjectId()
        }).then(data => {
          console.log('returned from mark', data)
          commonId = data.locationId
          console.log('ID to use: ', commonId)

        }).then(data => {     // redudant then
          console.log('c after then: ', commonId)

          Restaurant.create({
            ...restuarantData,
            locationId: commonId
          }).then(data => {
            console.log('returned from restaurant: ', data)
            resolve(data)
          }).catch(err => {
            console.log(4, err)
            reject('errored 2')
          });
        }).catch(() => {
          console.log(3)
          reject('errored 1')
        });
      })
    },


    // delete restaurant and corresponding mark
    deleteRestaurantById: (locationId) => {
      return new Promise((resolve, reject) => {
        let errorMessage = ''
        let restaurantDeleted = false
        let markDeleted = false

        // delete restaurant
        Restaurant.deleteOne({ locationId })
          .exec()
          .then(data => {
            console.log("HEEERE: ", data)

            if (data.deletedCount === 1) {
              restaurantDeleted = true
            }

            // delete mark
            Mark.deleteOne({ locationId })
              .exec()
              .then(data => {
                console.log('mark delete results:', data)
                if (data.deletedCount === 1) {
                  markDeleted = true
                  if (restaurantDeleted) resolve({'success': 'restuarant and mark deleted'})
                  else errorMessage = 'mark deleted, restaurant with specified id does not exist'
                } else {
                  if (restaurantDeleted) errorMessage = 'restuarant deleted, mark with specified id does not exist'
                  else errorMessage = 'no mark or restaurant with specified id'
                }
                reject(errorMessage)
              })
              .catch(err => {
                console.log('fail')
                reject(err.message)
            });

          }).catch(err => {
            console.log('failed?')
            reject(err.message)
          });
      })
    },


  }
}