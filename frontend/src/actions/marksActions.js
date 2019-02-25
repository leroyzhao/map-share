import axios from "axios";

let marks = []

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
