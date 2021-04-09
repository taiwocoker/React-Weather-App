import { toast } from 'react-toastify'
import * as types from './actionTypes'
import weatherDataApi from '../../api/weatherDataApi'
export const loadWeatherSuccess = (weatherData) => ({
  type: types.SET_WEATHER_DATA,
  weatherData,
})
function loadWeatherData(){
  return async (dispatch) => {
    try {
      const data = await weatherDataApi()
      if (data) {
        dispatch(loadWeatherSuccess(data.list))
      } else {
        dispatch(loadWeatherSuccess(null))
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`)
    }
  }
}
export default loadWeatherData;