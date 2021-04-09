import { combineReducers } from 'redux'
import ForecastData from './weatherDataReducer'
import Loading from './loadingReducer'
export default combineReducers({
  ForecastData,
  Loading,
})
