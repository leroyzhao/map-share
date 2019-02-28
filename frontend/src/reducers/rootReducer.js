import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  addMarkerReducer,
  marksFetchReducer,
  marksToggleReducer
} from "./marksReducer";
import { restaurantDetailReducer } from "./restaurantsReducer";
import {
  addReviewReducer,
  reviewsContentReducer,
  editReviewReducer
} from "./reviewReducer";
import { signInStatusReducer } from "./signInReducer";

export default combineReducers({
  marksFetchReducer,
  marksToggleReducer,
  addMarkerReducer,
  restaurantDetailReducer,
  signInStatusReducer,
  addReviewReducer,
  editReviewReducer,
  reviewsContentReducer,
  form: formReducer
});
