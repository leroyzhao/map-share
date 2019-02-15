let marks = [
  {
    id: 1,
    nameTag: "Jam3 Toronto",
    position: { lat: 43.6472857, lng: -79.3925776 }
  },
  {
    id: 2,
    nameTag: "Your position",
    position: { lat: 43.6425662, lng: -79.3892455 }
  }
];

export const toggleMarker = bool => {
  return {
    type: "TOGGLE_MARKER",
    status: bool
  };
};

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
    dispatch(marksFetchDataSuccess(marks));
  };
};

export const saveMark = data => {
  let test = { position: { lat: data.lat, lng: data.lng } };

  //let newarray = marks.push(test[0]);

  return (dispatch, getState) => {
    console.log(getState());
    dispatch(marksFetchDataSuccess([...marks, test]));
  };
};
