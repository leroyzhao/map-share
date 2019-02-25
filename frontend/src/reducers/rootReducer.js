import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  addMarkerReducer,
  marksFetchReducer,
  marksToggleReducer,
} from "./marksReducer";
import { restaurantDetailReducer } from "./restaurantsReducer";
import { signInStatusReducer } from './signInReducer'

export default combineReducers({
  marksFetchReducer,
  marksToggleReducer,
  addMarkerReducer,
  restaurantDetailReducer,
  signInStatusReducer,
  form: formReducer
});
