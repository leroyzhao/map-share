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
    axios.get(url).then(res => {
      dispatch(marksFetchDataSuccess(res.data));
    });
  };
};

export const getUserData = data => {
  // let url = 'https://map-share.herokuapp.com/api/marks?groupId='
  // return dispatch => {
  // }
};

export const saveMark = data => {
  let restaurantData = {
    userId: data.userId,
    groupId: data.groupId,
    restaurantName: data.restaurantName,
    restaurantLocation: data.restaurantLocation,
    priceRange: data.priceRange,
    geometry: data.geometry
  };

  console.log("data format: ", data);

  return dispatch => {
    axios
      .post("https://map-share.herokuapp.com/api/restaurants", restaurantData)
      .then(res => {
        let markData = {
          locationId: res.data.locationId,
          geometry: data.geometry
        };

        let reviewData = {
          locationId: res.data.locationId,
          reviewContent: data.review,
          reviewRating: data.rating,
          reviewUser: {
            userId: data.userId,
            userFirstName: data.userFirstName,
            userLastName: data.userLastName
          }
        };

        dispatch(marksFetchDataSuccess(markData));

        axios
          .post("https://map-share.herokuapp.com/api/reviews", reviewData)
          .catch(err => {
            console.log(err.response);
          });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};
