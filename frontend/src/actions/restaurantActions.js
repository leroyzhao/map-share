import axios from "axios";

export const restaurantFetchData = data => {
  return dispatch => {
    axios
      .get("https://map-share.herokuapp.com/api/restaurants/" + data.locationId)
      .then(resRestaurant => {
        // let item = { api: res.data, data: data };
        axios
          .get("https://map-share.herokuapp.com/api/reviews", { params: { locationId: resRestaurant.data.locationId } })
          .then(resReviews => {
            console.log(resReviews.data)
            let restaurantDetails = {
              restaurantLocation: resRestaurant.data.restaurantLocation,
              restaurantName: resRestaurant.data.restaurantName,
              priceRange: resRestaurant.data.restaurantPriceRange,
              reviews: resReviews.data.restaurantReviews
            }

            dispatch(currentRestaurant(restaurantDetails, data));
            dispatch(toggleMarker(true));
          })
          .catch(err => console.log('review get error: ', err.response));
      })
      .catch(err => console.log('restaurant get error: ', err.response));
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
