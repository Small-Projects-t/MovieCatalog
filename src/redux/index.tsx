import { combineReducers } from "redux";
import movies from './moviesReducer'
import countries from "./countryReducer";

export default combineReducers({
    movies,
    countries,
});
