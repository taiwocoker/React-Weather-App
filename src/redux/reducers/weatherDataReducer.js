import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default (state = initialState.weatherData, action) => {
  switch (action.type) {
    case types.SET_WEATHER_DATA:
      return action.weatherData
    default:
      return state
  }
}
