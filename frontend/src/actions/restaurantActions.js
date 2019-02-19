import axios from "axios";

export const restaurantFetchData = data => {
  return dispatch => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(res => {
        // let item = { api: res.data, data: data };
        dispatch(currentRestaurant(res.data, data));
        dispatch(toggleMarker(true));
      })
      .catch(err => console.log("restaurant fetch data error---> ", err));
  };
};

export const toggleMarker = bool => {
  return {
    type: "TOGGLE_MARKER",
    status: bool
  };
};

export const currentRestaurant = (api, data) => {
  return {
    type: "RESTAURANT_DETAILS",
    api: api,
    data: data
  };
};
