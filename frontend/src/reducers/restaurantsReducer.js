export const restaurantDetailReducer = (state = [], action) => {
  switch (action.type) {
    case "RESTAURANT_DETAILS":
      return action;
    default:
      return state;
  }
};
