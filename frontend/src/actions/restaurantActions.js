import axios from "axios";

export const restaurantFetchData = data => {
  return dispatch => {
    axios
      .get("https://map-share.herokuapp.com/api/restaurants/" + data.locationId)
      .then(resRestaurant => {
        let restaurantDetails = {
          locationId: resRestaurant.data.locationId,
          restaurantLocation: resRestaurant.data.restaurantLocation,
          restaurantName: resRestaurant.data.restaurantName,
          priceRange: resRestaurant.data.restaurantPriceRange
        };

        dispatch(currentRestaurant(restaurantDetails));
        dispatch(toggleMarker(true));
      })
      .catch(err => console.log("restaurant get error: ", err.response));
  };
};

export const toggleMarker = bool => {
  return {
    type: "TOGGLE_MARKER",
    status: bool
  };
};

export const currentRestaurant = data => {
  return {
    type: "RESTAURANT_DETAILS",
    data: data
  };
};
