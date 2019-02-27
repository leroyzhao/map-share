import axios from "axios";

export const putReview = data => {};

export const postReview = data => {
  return dispatch => {
    axios
      .post("https://map-share.herokuapp.com/api/reviews", data)
      .then(res => {
        let reviewData = {
          reviewContent: res.data.reviewContent,
          reviewRating: res.data.reviewContent
        };
        dispatch(addReview(reviewData));
        dispatch(toggleAddReview(false));
      })
      .catch(err => {
        console.log(err.response);
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
        dispatch(currentReviews(resReviews.data));
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
