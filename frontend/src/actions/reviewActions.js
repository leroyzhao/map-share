import axios from "axios";

export const putReview = data => {
  return dispatch => {
    axios
      .put("https://map-share.herokuapp.com/api/reviews/" + data.reviewId, data)
      .then(res => {
        dispatch(reviewFetchData(data.locationId));
        dispatch(toggleEditReview(false));
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const postReview = data => {
  return dispatch => {
    axios
      .post("https://map-share.herokuapp.com/api/reviews", data)
      .then(res => {
        console.log(res.data);
        let reviewData = {
          reviewContent: res.data.reviewContent,
          reviewRating: res.data.reviewContent,
          _id: res.data._id,
          reviewUser: {
            userId: res.data.reviewUser.userId,
            userFirstName: res.data.reviewUser.userFirstName,
            userLastName: res.data.reviewUser.userLastName
          }
        };
        dispatch(addReview(reviewData));
        dispatch(toggleAddReview(false));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const reviewFetchData = data => {
  return dispatch => {
    axios
      .get("https://map-share.herokuapp.com/api/reviews", {
        params: { locationId: data }
      })
      .then(resReviews => {
        console.log(resReviews.data);
        dispatch(currentReviews(resReviews.data.restaurantReviews));
      })
      .catch(err => console.log("review get error: ", err));
  };
};

export const currentReviews = data => {
  return {
    type: "REVIEWS_CONTENTS",
    data: data
  };
};

export const addReview = data => {
  return {
    type: "ADD_REVIEW",
    data: data
  };
};

export const editReview = data => {
  return {
    type: "EDIT_REVIEW",
    data: data
  };
};

export const toggleAddReview = bool => {
  return {
    type: "TOGGLE_ADD_REVIEW",
    showModal: bool
  };
};

export const toggleEditReview = bool => {
  return {
    type: "TOGGLE_EDIT_REVIEW",
    showModal: bool
  };
};
