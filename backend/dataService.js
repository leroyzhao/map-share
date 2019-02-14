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

    //PREVENT ADDING DUPLICATE??
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
            reject(err)
          });
        }).catch(() => {
          console.log(3)
          reject(err)
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
            console.log("restaraunt deleted count: ", data.deletedCount)

            if (data.deletedCount === 1) {
              restaurantDeleted = true
            }

            // delete mark
            Mark.deleteOne({ locationId })
              .exec()
              .then(data => {
                console.log('mark deleted count: ', data.deletedCount)
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

    updateRestaurantById: (locationId, newData) => {
      return new Promise((resolve, reject) => {
        console.log('running?')

        Restaurant.findOneAndUpdate({ locationId }, newData, {runValidators:true}).then((data) => {
          console.log('successfull update, this is old: ', data);
          resolve(data)
        }).catch(err => {
          console.log('problem??', err.message)
          reject(err.message)
        });

      })
    },
    
    addReview: (reviewData) => {
      return new Promise((resolve, reject) => {
        console.log('body data: ', reviewData)

        // format creation body first?
        // check if provided userId/restuarantId is valid first?
        Review.create({
          ...reviewData
        }).then(data => {
          console.log('returned from review creation', data)
          resolve(data)
        }).catch(err => {
          //console.log('HERE', err.message, err.name)
          reject(err)
          //reject({"name": err.name, "message": err.message})
        });
      })
    },

    updateReviewById: (reviewId, newReview) => {
      return new Promise((resolve, reject) => {

        // check if restaurant&user id match! then update. otherwise throw error

        // Review.pre('validate', function(next) {
        //   console.log("WOOOOO")
        //   if (self.isModified('_createdOn')) {
        //       self.invalidate('_createdOn');
        //   }
        // });
        Review.findByIdAndUpdate(reviewId, newReview, {runValidators: true}).then(data => {
          if (data) {console.log('review delete results:', data)
            resolve({'success': 'review updated'})
          } else reject('no review with specified id')
        }).catch(err => {
          reject(err)
        })
      })
    },

    deleteReviewById: (id) => {
      return new Promise((resolve, reject) => {

        Review.findByIdAndDelete(id).then(data => {
          if (data) {console.log('review delete results:', data)
            resolve({'success': 'review deleted'})
          } else reject('no review with specified id')
        }).catch(err => {
          console.log('fail')
          reject(err.message)
        });

      })
    },

    getMarks: () => {
      return new Promise((resolve, reject) => {
        Mark.find()
        .then(data => {
          console.log('data retrieved?', data)
          resolve(data)
        }).catch(err => {
          console.log('ERROROROOR')
          reject(err)
        });
      });
    },

    getUsers: () => {
      return new Promise((resolve, reject) => {
        User.find()
        .then(data => {
          console.log('data retrieved?', data)
          resolve(data)
        }).catch(err => {
          console.log('ERROROROOR')
          reject(err)
        });
      });
    },
    
    addUser: (userData) => {
      return new Promise((resolve, reject) => {
        console.log('new user data: ', userData)

        // format creation body first?
        // create. if exists, return error? currently email can't be duplicate
        User.create({
          ...userData
        }).then(data => {
          console.log('userId: ', data.userId)
          resolve(data)
        }).catch(err => {
          reject(err)
        });
      })
    },



  }
}