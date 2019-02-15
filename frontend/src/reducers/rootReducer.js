import { combineReducers } from "redux";
import {
  addMarkerReducer,
  marksFetchReducer,
  marksToggleReducer
} from "./marksReducer";

export default combineReducers({
  marksFetchReducer,
  marksToggleReducer,
  addMarkerReducer
});
