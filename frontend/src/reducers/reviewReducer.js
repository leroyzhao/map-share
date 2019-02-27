const initToggleState = {
  showModal: false
};

const initReviewState = {
  restaurantReviews: []
};

export const addReviewReducer = (state = initToggleState.showModal, action) => {
  switch (action.type) {
    case "TOGGLE_ADD_REVIEW":
      return action;
    default:
      return state;
  }
};

export const editReviewReducer = (
  state = initToggleState.showModal,
  action
) => {
  switch (action.type) {
    case "TOGGLE_EDIT_REVIEW":
      return action;
    default:
      return state;
  }
};

export const reviewsContentReducer = (state = initReviewState, action) => {
  switch (action.type) {
    case "REVIEWS_CONTENTS":
      return action.data;
    case "ADD_REVIEW":
      return state.concat(action.data);
    default:
      return state;
  }
};
