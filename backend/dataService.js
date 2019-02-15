const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const Restaurant = require('./models/restaurant');
const Cuisine = require('./models/cuisine');
const Mark = require('./models/mark');
const PriceRange = require('./models/priceRange');
const Review = require('./models/review');
const User = require('./models/user');
const Group = require('./models/group');

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

        Restaurant.findOne({ locationId })//: new mongoose.Types.ObjectId() })
          .then(data => {
            if (data) {
              console.log('search result: ', data)
              resolve(data)
            } else reject('no restaurant with specified id')
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

        let { groupId } = restuarantData
        if (!groupId) { // check if group id is valid
          reject({"error": "need groupId!"})
          return;
        }

        console.log(groupId)
        console.log('body data: ', restuarantData)
        let refId = ''

        Mark.create({
          locationId: new mongoose.Types.ObjectId(),
        }).then(data => {
          console.log('returned from mark', data)
          refId = data.id
          console.log('ID to use: ', data.locationId)

          Restaurant.create({
            ...restuarantData,
            locationId: data.locationId
          }).then(data => {
            console.log('returned from restaurant: ', data)

            // if (groupId) {

              Group.findByIdAndUpdate(
                groupId,
                { $push: { groupMarks: refId } },//data.locationId
                { runValidators: true }
              ).then(data => {
                console.log('returned from adding marker to group', data)
              }).catch(err => {
                console.log('couldnt add marker to group')
                reject(err)
              })

            // } else {
            //   reject("mark and restuarant, but not added to group")
            //   return;
            // }

            console.log('resolving!')
            resolve(data)
          }).catch(err => {
            console.log(4, err)
            reject(err)
          });
        }).catch(err => {
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

    //get reviews for specific restauarant
    getAllReviews: () => {
      return new Promise((resolve, reject) => {
        Review.find()
        .then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        });
      })
    },

    getReviewsByRestaurant: (reqBody) => {
      return new Promise((resolve, reject) => {

        let { locationId } = reqBody
        if (!locationId) {
          reject({"error": "include locationId in body"})
          return;
        }

        // WHY NOT MARK.FIND({ groupId })? (add groupid field in addRestaurant in dataService)
        Restaurant.findOne({locationId}).populate("restaurantReviews").then(data => {
          if (data) {
            console.log('restaurantReviews', data.restaurantReviews)
            resolve(data)
          } else reject({"error": "no restaurant with specified id"})
        }).catch(err => {
          console.log('error', err)
          reject(err)
        });

      });
    },
    
    addReview: (reviewData) => {
      return new Promise((resolve, reject) => {
        console.log('body data: ', reviewData)

        // format creation body first?
        // check if provided userId/restuarantId is valid first?
        Review.create({
          ...reviewData
        }).then(data => {
          console.log('returned from review creation', data, data.id)

          Restaurant.findOneAndUpdate(
            { locationId: data.restaurantId },
            { $push: { restaurantReviews: data.id } },//data.locationId
            { runValidators: true }
          ).then(data => {
            console.log('returned from adding review to restaurant', data)
            resolve(data)
          }).catch(err => {
            console.log('couldnt add review to restuarant')
            reject(err)
          })

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
          if (data) {
            console.log('review delete results:', data)
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
          if (data) {
            console.log('review delete results:', data)
            resolve({'success': 'review deleted'})
          } else reject('no review with specified id')
        }).catch(err => {
          console.log('fail')
          reject(err.message)
        });

      })
    },

    getMarks: (reqBody) => {
      return new Promise((resolve, reject) => {

        let { groupId } = reqBody
        if (!groupId) {
          reject({"error": "include groupId in body"})
          return;
        }

        // WHY NOT MARK.FIND({ groupId })? (add groupid field in addRestaurant in dataService)
        Group.findById(groupId).populate("groupMarks").then(data => {
          console.log('newdata', data)
          console.log('groupmarkers', data.groupMarks)
          resolve(data)
        }).catch(err => {
          console.log('error', err)
          reject(err)
        });

        // Mark.find({ groupId })
        // .then(data => {
        //   resolve(data)
        // }).catch(err => {
        //   console.log('ERROROROOR')
        //   reject(err)
        // });
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
    
    getUserById: (userId) => {
      return new Promise((resolve, reject) => {
        console.log(userId)
        User.findById(userId)
          .then(data => {
            if (data) resolve(data)
            else reject('no user with specified id')
          })
          .catch(err => {
            console.log('fail')
            reject(err)
        });
      });
    },
    
    getGroups: () => {
      return new Promise((resolve, reject) => {
        Group.find()
        .then(data => {
          console.log('data retrieved?', data)
          resolve(data)
        }).catch(err => {
          console.log('ERROROROOR')
          reject(err)
        });
      });
    },
    
    addGroup: (groupData) => {
      return new Promise((resolve, reject) => {
        console.log('new groupData: ', groupData)

        // format creation body first?
        // create. if exists, return error?
        Group.create({
          ...groupData
        }).then(data => {
          console.log('groupId: ', data.groupId)
          resolve(data)
        }).catch(err => {
          console.log(err)
          reject(err)
        });
      })
    },




  }
}