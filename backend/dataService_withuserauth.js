const mongoose = require("mongoose");

const Restaurant = require('./models/restaurant');
const Cuisine = require('./models/cuisine');
const Mark = require('./models/mark');
const PriceRange = require('./models/priceRange');
const Review = require('./models/review');
const User = require('./models/user');
const Group = require('./models/group');

module.exports = () => {
  return {

    getRestaurants: () => {
      return new Promise((resolve, reject) => {

        Restaurant.find()
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
    },

    getRestaurantById: (locationId) => {
      return new Promise((resolve, reject) => {

        // validate location ******ADD ! TO IMPLEMENT******
        // if (locationId.match(/^[0-9a-fA-F]{24}$/)) {
        //   reject('invalid id')
        // }

        Restaurant.findOne({ locationId })
          .then(data => {
            if (data) resolve(data)
            else reject('no restaurant with specified id')
          })
          .catch(err => {
            reject(err)
        });

      });
    },

    //check groupid exists first?

    //PREVENT ADDING DUPLICATE??
    addRestaurant: (restaurantData) => {
      return new Promise((resolve, reject) => {

        let { groupId, geometry, restaurantName, restaurantLocation, userId } = restaurantData

        if (!(groupId && geometry && restaurantName && restaurantLocation && userId)) {
          reject({"error": "missing fields, need groupId, geometry, restaurantName, restaurantLocation, userId"})
          return;
        }

        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(userId)) {
          reject({"error": "either groupId or userId cannot be converted to valid ObjectId"})
          return
        }

        Group.findById(groupId).then(doc => {
          if (!doc) {
            reject({"error": "group doesn't exist"}) //cannot complete operation code?
          } else if (!doc.groupMembers.some(id => {return id.equals(userId)})) {
            reject({"error": "user doesn't belong to group"})
          } else {

            let refId = ''

            Mark.create({ 
              locationId: new mongoose.Types.ObjectId(),
              groupId,
              geometry
            })
            .then(data => {
              console.log('returned from mark', data)
              refId = data.id // later populated via id!
              console.log('ID to use: ', data.locationId)

              Restaurant.create({
                ...restaurantData,
                locationId: data.locationId
              })
              .then(data => {
                console.log('returned from restaurant: ', data)

                doc.groupMarks.push(refId)

                doc.save()
                .then(data => {
                  console.log('returned from adding marker&user to group', data)
                })
                .catch(err => {
                  console.log('couldnt add marker/user to group')
                  reject(err)
                })

                resolve(data)
              })
              .catch(err => reject(err));

            })
            .catch(err => reject(err));

          }
        })
        .catch(err => reject(err))
      })
    },


    // delete restaurant and corresponding mark
    deleteRestaurantById: (locationId, reqBody) => {
      return new Promise((resolve, reject) => {

        if (!reqBody.userId) {
          reject("provide userId")
          return
        }

        Restaurant.findOne({ locationId }).populate('groupId')
        .then(restaurantData => {
          console.log('restaurantData: ', restaurantData)

          if (!restaurantData) {
            reject("restaurant doesn't exist") //error code?
            return
          }
          if (!restaurantData.groupId.groupMembers.some(id => {return id.equals(reqBody.userId)})) {
            reject("user does not belong to this restaurant's group")
            return
          }

          // delete mark, reviews, mark from groupmarks

          Mark.deleteOne({ locationId })
          .then(markData => {
            console.log('markData: ', markData)
          })
          .catch(err => {
            console.log("error deleting markData", err)
          })

          Review.deleteMany({ restaurantId: locationId })
          .then(reviewData => {
            console.log('reviewData: ', reviewData)
          })
          .catch(err => {
            console.log("error deleting reviewData", err)
          })

          Group.updateOne(
            {_id: restaurantData.groupId},
            { $pull: {groupMarks: locationId } }
          )
          .then(groupData => {
            console.log("updated group? ", groupData)
          })
          .catch(err => {
            console.log('failed to update group', err)
          })

          restaurantData.remove().then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })

        }).catch(err => reject(err))

      })
    },

    updateRestaurantById: (restaurantId, newData) => {
      return new Promise((resolve, reject) => {

        // check if restaurant&user id match! then update. otherwise throw error

        let { userId, restaurantName, restaurantLocation, restaurantCuisine, restaurantPriceRange } = newData

        if (!(userId && restaurantName && restaurantLocation)) {
          reject("body requires userId, restaurantName, restaurantLocation")
          return
        }
        else if (!(mongoose.Types.ObjectId.isValid(restaurantId) &&
                   mongoose.Types.ObjectId.isValid(userId))) {
          reject("provide valid userId in body, valid locationId in URL")
          return
        }

        Restaurant.findOne({locationId: restaurantId})
        .then(doc => {

          if (!doc) {
            reject("restaurant doesn't exist") //TURN INTO 404????????????
            return
          }

          console.log("OLD DOC:", doc)
          console.log("NEW DOC:", newData)

          if (newData.locationId || newData.groupId || newData.restaurantReviews) {
            reject("cannot update restaurant locationId or groupId")
          } else {
            Group.findById(doc.groupId)
            .then(groupData => {
              if (groupData.groupMembers.some(id => {return id.equals(userId)})) {
                
                doc.restaurantName = restaurantName
                doc.restaurantLocation = restaurantLocation

                doc.save()
                .then(data => {resolve( {"success": data} )})
                .catch(err => reject(err))

              } else {
                reject("user does not belong to this restaurant's group")
              }

            })
            .catch(err => reject(err))
            
          }
        }).catch(err => reject(err))

      })
    },

    //get reviews for specific restauarant
    getAllReviews: () => {
      return new Promise((resolve, reject) => {
        Review.find()
        .then(data => resolve(data))
        .catch(err => reject(err));
      })
    },

    getReviewsByRestaurant: (reqBody) => {
      return new Promise((resolve, reject) => {
        let { locationId } = reqBody

        if (!locationId) {
          reject({"error": "include locationId in body"})
          return;
        }

        Restaurant.findOne({ locationId })
        .populate("restaurantReviews")
        .then(data => {
          if (data) {
            console.log('restaurantReviews', data.restaurantReviews)
            resolve(data)
          } else {
            reject({"error": "no restaurant with specified id"})
          }
        })
        .catch(err => reject(err));

      });
    },
    
    addReview: (reviewData) => {
      return new Promise((resolve, reject) => {
        let { restaurantId, reviewUser} = reviewData

        if (!(restaurantId && reviewUser && reviewUser.userId)) {
          reject("include restaurantId, reviewUser, and reviewUser.userId")
          return
        }

        Restaurant.findOne({locationId: reviewData.restaurantId})
        .populate("groupId")
        .then(doc => {
          if (!doc) {
            reject("restaurant doesn't exist")
            return
          } else if (!doc.groupId.groupMembers.some(id => {return id.equals(reviewData.reviewUser.userId)})) {
            reject("user doesn't belong to group") 
            return
          }

          // review only created if user in group
          Review.create({ ...reviewData })
          .then(reviewData => {
            console.log('returned from review creation', reviewData)
            doc.restaurantReviews.push(reviewData.id)

            doc.save()
            .then(d => {
              console.log('returned from adding review to restaurant', d)
              resolve(reviewData)
            })
            .catch(err => {
              console.log('couldnt add review to restuarant')
              reject(err)
            })
  
          })
          .catch(err => reject(err));
        })
        .catch(err => reject(err))
      })
    },

    updateReviewById: (reviewId, newReview) => {
      return new Promise((resolve, reject) => {

        let { restaurantId, reviewUser, reviewContent, reviewRating } = newReview

        if (!(restaurantId && reviewContent && reviewRating && reviewUser && reviewUser.userId)) {
          reject("include restaurantId, reviewContent, reviewRating, reviewUser, and reviewUser.userId")
          return
        }
        else if (!(mongoose.Types.ObjectId.isValid(restaurantId) &&
                   mongoose.Types.ObjectId.isValid(reviewUser.userId))) {
          reject("provide valid restaurantId and userId")
          return
        }

        Review.findById(reviewId)
        .then(doc => {

          if (!doc) {
            reject("review doesn't exist") //TURN INTO 404????????????
            return
          }

          console.log("OLD DOC:", doc)
          console.log("NEW DOC:", newReview)

          if (!( doc.restaurantId.toString() === newReview.restaurantId ) ||
              !( doc.reviewUser.userId.toString() === newReview.reviewUser.userId)) {

            reject("cannot update restaurant or user Id")
          }
          else {
            doc.reviewContent = newReview.reviewContent
            doc.reviewRating = newReview.reviewRating

            doc.save()
            .then(data => resolve({"success": data}))
            .catch(err => reject(err))
          }
        })
        .catch(err => reject(err))
      })
    },

    deleteReviewById: (id) => {
      return new Promise((resolve, reject) => {

        // USER PERMISSIONS???
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

    getMarks: (reqQuery) => {
      return new Promise((resolve, reject) => {

        let { groupId, lat, lng, userId } = reqQuery
        
        if (!groupId) {
          reject({"error": "include groupId in query"})
          return;
        }

        Group.findById(groupId)
        .then(data => {
          if (!userId in data.groupMembers) {
            reject("user is not part of this group")
            return
          }

          if (!lat || !lng) {

            // WHY NOT MARK.FIND({ groupId })? (add groupid field in addRestaurant in dataService)
            Group.findById(groupId)
            .populate("groupMarks")
            .then(data => {
              console.log('newdata', data)
              // return 404 if null!-todo
              console.log('groupmarkers', data.groupMarks)
              resolve(data)
            })
            .catch(err => reject({"cannot populate??": err}))

          } else {
            ////////////////////////////////////////
            coordinates = [
              parseFloat(lat),
              parseFloat(lng)
            ]

            Mark.aggregate([
              { $geoNear: {
                  near: {
                    type: "Point",
                    coordinates
                  },
                  maxDistance: 100000,
                  spherical: true,
                  distanceField: "distance"
                }
              },
              { $match: { groupId: mongoose.Types.ObjectId(groupId) } }
            ])
            .then(data => resolve(data))
            .catch(err => reject(err))
            /////////////////////////////////////////
          }

        }).catch(err => reject(err));
      });
    },

    // // configurable maxDistance?
    // getNearestMarks: (reqQuery) => {
    //   return new Promise((resolve, reject) => {
    //     coordinates = [
    //       parseFloat(reqQuery.lat),
    //       parseFloat(reqQuery.lng)
    //     ]
    //     Mark.aggregate().near({
    //       near: {
    //         type: "Point",
    //         coordinates
    //       },
    //       maxDistance: 100000,
    //       spherical: true,
    //       distanceField: "dis"
    //     }).then(data => {
    //       console.log('got nearest')
    //       resolve(data)
    //     }).catch(err => {
    //       console.log('error fetching nearest')
    //       reject(err)
    //     })
    //   })
    // },

    getUsers: () => {
      return new Promise((resolve, reject) => {
        User.find()
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
    },
    
    addUser: (userData) => {
      return new Promise((resolve, reject) => {
        console.log('new user data: ', userData)

        // format creation body first?
        // create. if exists, return error? currently email can't be duplicate
        User.create({ ...userData })
        .then(data => {
          console.log('userId: ', data.userId)
          resolve(data)
        })
        .catch(err => reject(err));
      })
    },
    
    getUserById: (userId) => {
      return new Promise((resolve, reject) => {

        User.findById(userId)
          .then(data => {
            if (data) resolve(data)
            else reject('no user with specified id')
          })
          .catch(err => reject(err));
      });
    },
    
    getGroups: () => {
      return new Promise((resolve, reject) => {
        Group.find()
        .populate("groupMarks") //.populate("groupMembers")
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
    },

    getGroup: (groupId) => {
      return new Promise((resolve, reject) => {
        Group.findById(groupId)
        .then(data => resolve(data))
        .catch(err => reject(err))
      })
    },
    
    addGroup: (groupData) => {
      return new Promise((resolve, reject) => {

        if (!groupData.userId) {
          reject("need userId field")
          return
        }

        User.findById(groupData.userId)
        .then(userData => {
          
          if (!userData) {
            reject("user doesn't exist")
            return
          }

          Group.create({
            ...groupData,
            groupMembers: [groupData.userId]   // add initial groupmember
          })
          .then(data => {
            console.log('groupId: ', data.groupId)
            userData.userGroups.push(data.groupId)

            userData.save()
            .then(() => resolve(data))
            .catch(err => {
              reject({"group created, but couldn't add group to user": err})
            })

          })
          .catch(err => reject(err));
          
        })
        .catch(err => reject(err))

      })
    }

  }
}