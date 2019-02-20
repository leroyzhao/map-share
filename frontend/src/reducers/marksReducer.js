const initToggleState = {
  status: false
};

const initModalState = {
  showModal: false //Hides or the shows modalWindow
};

const initMarkerState = {
  mark: []
};

export const marksFetchReducer = (state = initMarkerState.mark, action) => {
  switch (action.type) {
    case "MARKS_FETCH_DATA_SUCCESS":
      return action.marks;
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

export const addMarkerReducer = (state = initMarkerState, action) => {
  switch (action.type) {
    case "ADD_MARKER":
      return action;
    default:
      return state;
  }
};
