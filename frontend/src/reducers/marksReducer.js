const initToggleState = {
  status: false
};

const initModalState = {
  showModal: false
};

const initMarkerState = {
  marks: []
};

export const marksFetchReducer = (state = initMarkerState.marks, action) => {
  switch (action.type) {
    case "MARKS_FETCH_DATA_SUCCESS":
      return action.marks
    default:
      return state;
  }
};

export const marksToggleReducer = (state = initToggleState.status, action) => {
  switch (action.type) {
    case "TOGGLE_MARKER":
      return action;
    default:
      return state;
  }
};

export const addMarkerReducer = (state = initModalState.showModal, action) => {
  switch (action.type) {
    case "ADD_MARKER":
      return action;
    default:
      return state;
  }
};
