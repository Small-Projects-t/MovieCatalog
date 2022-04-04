import { combineReducers } from "redux";
import movies from './reducers/moviesReducer'
import countries from "./reducers/countryReducer";

export default combineReducers({
    movies,
    countries,
});
