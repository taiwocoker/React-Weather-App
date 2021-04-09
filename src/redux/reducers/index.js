import { combineReducers } from 'redux'
import WeatherData from './weatherDataReducer'
import Loading from './loadingReducer'
export default combineReducers({
  WeatherData,
  Loading,
})
