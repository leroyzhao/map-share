import axios from "axios";

export const addMarker = bool => {
  return {
    type: "ADD_MARKER",
    showModal: bool
  };
};

export const marksHasError = bool => {
  return {
    type: "MARKS_HAS_ERRORED",
    hasErrored: bool
  };
};

export const marksIsLoading = bool => {
  return {
    type: "MARKS_IS_LOADING",
    isLoading: bool
  };
};

export const marksFetchDataSuccess = marks => {
  return {
    type: "MARKS_FETCH_DATA_SUCCESS",
    marks: marks
  };
};

export const marksFetchData = url => {
  return dispatch => {
    axios
      .get(url + 'groupId=5c7016010b10a5189ccc07e3')
      .then(res => {
        dispatch(marksFetchDataSuccess(res.data))
      });
  };
};

export const getUserData = data => {
  // let url = 'https://map-share.herokuapp.com/api/marks?groupId='
  // return dispatch => {

  // }
}

export const saveMark = data => {
  let restaurantData = {
    userId: "5c7015b00b10a5189ccc07e2",
    groupId: "5c7016010b10a5189ccc07e3",
    restaurantName: data.restaurantName,
    restaurantLocation: data.restaurantLocation,
    priceRange: data.priceRange,
    geometry: data.geometry
  }

  console.log('data format: ', restaurantData);

  return (dispatch) => {
    axios
      .post("https://map-share.herokuapp.com/api/restaurants", restaurantData)
      .then(res => {
        let markData = {
          locationId: res.data.locationId,
          geometry: data.geometry
        }

        let reviewData = {
          locationId: res.data.locationId,
          reviewContent: data.review,
          reviewRating: data.rating,
          reviewUser: {
            userId: "5c7015b00b10a5189ccc07e2"
          }
        }

        dispatch(marksFetchDataSuccess(markData))

        axios
          .post("https://map-share.herokuapp.com/api/reviews", reviewData)
          .catch(err => {
            console.log(err.response);
          })
      })
      .catch(err => {
        console.log(err.response);
      })
  };
};
