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

        Restaurant.findOne({ locationId })
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

    //check groupid exists first?

    //PREVENT ADDING DUPLICATE??
    addRestaurant: (restaurantData) => {
      return new Promise((resolve, reject) => {

        let { groupId, geometry, restaurantName, restaurantLocation, userId } = restaurantData
        if (!(groupId && geometry && restaurantName && restaurantLocation && userId)) { // check if group id is valid
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
            console.log(groupId)
            console.log('body data: ', restaurantData)
            let refId = ''

            Mark.create({ 
              locationId: new mongoose.Types.ObjectId(),
              groupId,
              geometry
            }).then(data => {
              console.log('returned from mark', data)
              refId = data.id // later populated via id!
              console.log('ID to use: ', data.locationId)

              Restaurant.create({
                ...restaurantData,
                locationId: data.locationId
              }).then(data => {
                console.log('returned from restaurant: ', data)

                // if (groupId) {

                  doc.groupMarks.push(refId)
                  doc.save().then(data => {
                    console.log('returned from adding marker&user to group', data)
                  }).catch(err => {
                    console.log('couldnt add marker/user to group')
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

          }
        }).catch(err => reject(err))
      })
    },


    // delete restaurant and corresponding mark
    deleteRestaurantById: (locationId, reqBody) => {
      return new Promise((resolve, reject) => {
        let errorMessage = ''
        let restaurantDeleted = false
        if (!reqBody.userId) reject("provide userId")

        Restaurant.findOne({ locationId }).populate('groupId').then(doc => {
          if (!doc) {
            reject("restaurant doesn't exist") //error code?
            return
          }
          console.log('restaurant doc: ', doc)
          if (!doc.groupId.groupMembers.some(id => {return id.equals(reqBody.userId)})) {
            reject("user does not belong to this restaurant's group")
            return
          }

          ///delete marks and reviews?
          Mark.deleteOne({ locationId }).then(markData => {
            console.log('markData: ', markData)
          }).catch(err => {
            console.log("error deleting markData", err)
          })

          Review.deleteMany({ restaurantId: locationId }).then(reviewData => {
            console.log('reviewData: ', reviewData)
          }).catch(err => {
            console.log("error deleting reviewData", err)
          })

          doc.remove().then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })

        }).catch(err => {console.log(err); reject(err)})

        // delete restaurant
        // Restaurant.deleteOne({ locationId })
        //   .exec()
        //   .then(data => {
        //     console.log("restaraunt deleted count: ", data.deletedCount)

        //     if (data.deletedCount === 1) {
        //       restaurantDeleted = true
        //     }

        //     // delete mark
        //     Mark.deleteOne({ locationId })
        //       .exec()
        //       .then(data => {
        //         console.log('mark deleted count: ', data.deletedCount)
        //         if (data.deletedCount === 1) {
        //           markDeleted = true
        //           if (restaurantDeleted) resolve({'success': 'restuarant and mark deleted'})
        //           ///////////////DELETE MARKER OID FROM GROUPMARKERS ARRAY, delete all corresponding reviews////////////
        //           else errorMessage = 'mark deleted, restaurant with specified id does not exist'
        //         } else {
        //           if (restaurantDeleted) errorMessage = 'restuarant deleted, mark with specified id does not exist'
        //           else errorMessage = 'no mark or restaurant with specified id'
        //         }
        //         reject(errorMessage)
        //       })
        //       .catch(err => {
        //         console.log('fail')
        //         reject(err.message)
        //     });

        //   }).catch(err => {
        //     console.log('failed?')
        //     reject(err.message)
        //   });
      })
    },

    // updateRestaurantById: (locationId, newData) => {
    //   return new Promise((resolve, reject) => {
    //     console.log('running?')

    //     Restaurant.findOneAndUpdate({ locationId }, newData, {runValidators:true}).then((data) => {
    //       console.log('successfull update, this is old: ', data);
    //       resolve(data)
    //     }).catch(err => {
    //       console.log('problem??', err.message)
    //       reject(err.message)
    //     });

    //   })
    // },

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

        Restaurant.findOne({locationId: restaurantId}).then(doc => {
          console.log(doc)
          if (!doc) {
            reject("restaurant doesn't exist") //TURN INTO 404????????????
            return
          }

          console.log("OLD DOC:", doc)
          console.log("NEW DOC:", newData)
          if (newData.locationId || newData.groupId || newData.restaurantReviews) {
            reject("cannot update restaurant locationId or groupId")
          } else {

            Group.findById(doc.groupId).then(gd => {
              if (gd.groupMembers.some(id => {return id.equals(userId)})) {
                doc.restaurantName = restaurantName
                doc.restaurantLocation = restaurantLocation
                doc.save().then(data => {
                  resolve({"success": data})
                }).catch(err => {
                  reject(err)
                })
              } else {
                reject("user does not belong to this restaurant's group")
              }
            }).catch(err => {console.log('2'); reject(err); return})
            
          }
        }).catch(err => {console.log(err);reject(err)})
        // Review.findByIdAndUpdate(reviewId, newReview, {runValidators: true}).then(data => {
        //   if (data) {
        //     console.log('review delete results:', data)
        //     resolve({'success': 'review updated'})
        //   } else reject('no review with specified id')
        // }).catch(err => {
        //   reject(err)
        // })
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
        // check if provided userId/restaurantId is valid first?
        let { restaurantId, reviewUser} = reviewData

        if (!(restaurantId && reviewUser && reviewUser.userId)) {
          reject("include restaurantId, reviewUser, and reviewUser.userId")
          return
        }

        Restaurant.findOne({locationId: reviewData.restaurantId}).populate("groupId").then(doc => {
          console.log('heres doc', doc)
          if (!doc) {
            reject("restaurant doesn't exist")
            return
          } else if (!doc.groupId.groupMembers.some(id => {return id.equals(reviewData.reviewUser.userId)})) {
            reject("user doesn't belong to group") 
            return
          }
          console.log('user belongs to group: ', doc.groupId.groupMembers.some(id => {return id.equals(reviewData.reviewUser.userId)}))
          //ONLY CREATE IF USER A PART OF GROUP

          Review.create({
            ...reviewData
          }).then(data => {
            console.log('returned from review creation', data, data.id)
  
            doc.restaurantReviews.push(data.id)
            doc.save().then(d => {
              console.log('returned from adding review to restaurant', d)
              resolve(data)
            }).catch(err => {
              console.log('couldnt add review to restuarant')
              reject(err)
            })
  
          }).catch(err => {
            reject(err)
          });

        }).catch(err => {
          console.log("error in findone", err)
          reject(err)
        })
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

        Review.findById(reviewId).then(doc => {
          if (!doc) {
            reject("review doesn't exist") //TURN INTO 404????????????
            return
          }

          console.log("OLD DOC:", doc)
          console.log("NEW DOC:", newReview)
          if (!( doc.restaurantId.toString() === newReview.restaurantId ) ||
              !( doc.reviewUser.userId.toString() === newReview.reviewUser.userId)) {

            reject("cannot update restaurant or user Id")
          } else {
            doc.reviewContent = newReview.reviewContent
            doc.reviewRating = newReview.reviewRating
            doc.save().then(data => {
              resolve({"success": data})
            }).catch(err => {
              reject(err)
            })
            
          }
        }).catch(err => reject(err))
        // Review.findByIdAndUpdate(reviewId, newReview, {runValidators: true}).then(data => {
        //   if (data) {
        //     console.log('review delete results:', data)
        //     resolve({'success': 'review updated'})
        //   } else reject('no review with specified id')
        // }).catch(err => {
        //   reject(err)
        // })
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

    getMarks: (reqQuery) => {
      return new Promise((resolve, reject) => {

        let { groupId, lat, lng, userId } = reqQuery
        if (!groupId) {
          
          reject({"error": "include groupId in query"})
          return;
        }

        Group.findById(groupId).then(data => {
          if (!userId in data.groupMembers) {
            reject("user is not part of this group")
            return
          }

          if (!lat || !lng) {
            // WHY NOT MARK.FIND({ groupId })? (add groupid field in addRestaurant in dataService)
            Group.findById(groupId).populate("groupMarks").then(data => {
              console.log('newdata', data)
              // return 404 if null!-todo
              console.log('groupmarkers', data.groupMarks)
              resolve(data)
            }).catch(err => {
              reject({"cannot populate??": err})
            })

          } else {
            ////////////////////////////////////////
            coordinates = [
              parseFloat(lat),
              parseFloat(lng)
            ]
            console.log(coordinates)
            Mark.aggregate([
              {
                $geoNear: {
                  near: {
                    type: "Point",
                    coordinates
                  },
                  maxDistance: 100000,
                  spherical: true,
                  distanceField: "distance"
                }
              },
              {$match: { groupId: mongoose.Types.ObjectId(groupId) }}
            ]).then(data => {
              console.log('got nearest')
              resolve(data)
            }).catch(err => {
              console.log('error fetching nearest')
              reject(err)
            })
            /////////////////////////////////////////
          }

        }).catch(err => {
          console.log('error', err)
          reject(err)
        });


      });
    },

    // configurable maxDistance?
    getNearestMarks: (reqQuery) => {
      return new Promise((resolve, reject) => {
        coordinates = [
          parseFloat(reqQuery.lat),
          parseFloat(reqQuery.lng)
        ]
        Mark.aggregate().near({
          near: {
            type: "Point",
            coordinates
          },
          maxDistance: 100000,
          spherical: true,
          distanceField: "dis"
        }).then(data => {
          console.log('got nearest')
          resolve(data)
        }).catch(err => {
          console.log('error fetching nearest')
          reject(err)
        })
      })
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
        Group.find().populate("groupMarks") //.populate("groupMembers")
        .then(data => {
          console.log('data retrieved?', data)
          resolve(data)
        }).catch(err => {
          console.log('ERROROROOR')
          reject(err)
        });
      });
    },

    getGroup: (groupId) => {
      return new Promise((resolve, reject) => {
        Group.findById(groupId).then(data => {
          resolve(data)
        }).catch(err => resolve(err))
      })
    },
    
    addGroup: (groupData) => {
      return new Promise((resolve, reject) => {
        console.log('new groupData: ', groupData)

        if (!groupData.userId) reject("need userId field")
        User.findById(groupData.userId).then(doc => {
          if (!doc) {
            reject("user doesn't exist")
            return
          }

          Group.create({
            ...groupData,
            groupMembers: [groupData.userId]   ///////////////////add initial groupmember
          }).then(data => {
            console.log('groupId: ', data.groupId)

            doc.userGroups.push(data.groupId)
            doc.save().then(d => {
              resolve(data)
            }).catch(err => {
              reject({"group created, but couldn't add group to user": err})
            })

          }).catch(err => {
            console.log(err)
            reject(err)
          });

        }).catch(err => reject(err))

      })
    },




  }
}