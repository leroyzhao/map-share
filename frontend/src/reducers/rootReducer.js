import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  addMarkerReducer,
  marksFetchReducer,
  marksToggleReducer
} from "./marksReducer";
import { restaurantDetailReducer } from "./restaurantsReducer";

export default combineReducers({
  marksFetchReducer,
  marksToggleReducer,
  addMarkerReducer,
  restaurantDetailReducer,
  form: formReducer
});
