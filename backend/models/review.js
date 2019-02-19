const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create review Schema & model
const ReviewSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    required: [true, 'restarantId is required for review'],
    set: function(id) {
      this.previousResId = this.restaurantId;
      this._conditions = { ...this._conditions, restaurantId:id}
      console.log(id, "Previous restaurant id: ")
      return id
    }

    // validate: {
    //   validator: function(v) {
    //     console.log("YYYYYYYYEEEEEEEEEOOOOOOOOOOOOOOOOOOOO", v)
    //     return null
    //     //return /\d{3}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // },
  },
  reviewContent: {
    type: String,
    required: [true, 'content is required to save review']
  },
  reviewRating: {
    type: Number,
    required: [true, 'rating is required to save review']
  },
  reviewUser: {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'userId is required to save review']
    },
    userName: String
  },
}, { runSettersOnQuery: true })

// const ReviewSchema = new Schema({
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'restaurant',
//     required: [true, 'restaurantId is required to save review']
//   },
//   reviewList: [{
//     reviewId: mongoose.Schema.Types.ObjectId,
//     reviewContent: {
//       type: String,
//       required: [true, 'content is required to save review']
//     },
//     reviewRating: {
//       type: Number,
//       required: [true, 'rating is required to save review']
//     },
//     reviewUser: {
//       type: String,
//       required: [true, 'reviewUser is required to save review']
//     },
//   }]
// })

// ReviewSchema.pre('validate', function (next) {
//   console.log('YEEOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO') // current document
//   next()
// })

ReviewSchema.pre('findOneAndUpdate', function(next) {
  console.log('validating!!!!!!!!!!!!!!!!!!!!')
  console.log(this._previousResId)
  next()
})

ReviewSchema.post('findOneAndUpdate', function(doc) {
  this._previousResId = this._update.reviewContent // resId, userid
  console.log('DONE SAVING', this._previousResId)
})

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;