import axios from "axios";

let marks = []
// {
//   id: 1,
//   restaurantName: "Jam3 Toronto",
//   address: "101 testing road",
//   review: "testing review bla bla bla bla",
//   priceRange: "$$",
//   img: "https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
//   rating: "4.5",
//   position: { lat: 43.6472857, lng: -79.3925776 }
// },
// {
//   id: 2,
//   restaurantName: "Your position",
//   address: "101 testing road",
//   review: "testing review bla bla bla bla",
//   priceRange: "$$",
//   img: "https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
//   rating: "3.67",
//   position: { lat: 43.6425662, lng: -79.3892455 }
// }

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
  console.log('first fetch===>', marks);
  return {
    type: "MARKS_FETCH_DATA_SUCCESS",
    marks: marks
  };
};

export const marksFetchData = url => {
  return dispatch => {
    axios
      .get(url + 'groupId=5c7016010b10a5189ccc07e3')
      .then(res => dispatch(marksFetchDataSuccess(res.data.groupMarks)));
  };
};

export const getUserData = data => {
  // let url = 'https://map-share.herokuapp.com/api/marks?groupId='
  // return dispatch => {

  // }
}

export const saveMark = data => {
  let temp = {
    userId: "5c7015b00b10a5189ccc07e2",
    groupId: "5c7016010b10a5189ccc07e3",
    ...data,
    geometry: data.geometry
  }

  console.log('data format: ', temp);

  return (dispatch, getState) => {
    axios
      .post("https://map-share.herokuapp.com/api/restaurants", temp)
      .then(res => dispatch(marksFetchDataSuccess([...marks, temp])))
      .catch(err => {
        console.log(err);
      })
  };
};
