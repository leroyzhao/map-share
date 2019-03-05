import axios from "axios";

export const joinGroup = data => {
  return dispatch => {
    console.log('joinGroup action!')
    //eventually dispatch addGroupToUser
    // axios
    //   .put("https://map-share.herokuapp.com/api/reviews/" + data.reviewId, data)
    //   .then(res => {
    //     dispatch(reviewFetchData(data.locationId));
    //     dispatch(toggleEditReview(false));
    //   })
    //   .catch(err => {
    //     console.log(err.response);
    //   });
  };
};

export const createGroup = (groupName, userId) => {
  return dispatch => {
    console.log('createGroup action!', userId)
    axios
      .post("https://map-share.herokuapp.com/api/groups", {userId, groupName})
      .then(res => {
        dispatch(addGroupToUser(res.data._id))
      })
      .catch(err => console.log(err.response))
    // axios
    //   .post("https://map-share.herokuapp.com/api/groups", data)
    //   .then(res => {
    //     console.log(res.data);
    //     let reviewData = {
    //       reviewContent: res.data.reviewContent,
    //       reviewRating: res.data.reviewContent,
    //       _id: res.data._id,
    //       reviewUser: {
    //         userId: res.data.reviewUser.userId,
    //         userFirstName: res.data.reviewUser.userFirstName,
    //         userLastName: res.data.reviewUser.userLastName
    //       }
    //     };
    //     dispatch(addReview(reviewData));
    //     dispatch(toggleAddReview(false));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
};

export const addGroupToUser = data => {
  return {
    type: "ADD_GROUP",
    data: data
  }
}