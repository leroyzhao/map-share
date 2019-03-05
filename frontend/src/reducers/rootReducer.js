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
import {
  signInStatusReducer,
  userFetchReducer,
  joinGroupErrorReducer
} from "./signInReducer";

export default combineReducers({
  marksFetchReducer,
  marksToggleReducer,
  addMarkerReducer,
  restaurantDetailReducer,
  signInStatusReducer,
  userFetchReducer,
  joinGroupErrorReducer,
  addReviewReducer,
  editReviewReducer,
  reviewsContentReducer,
  form: formReducer
});
