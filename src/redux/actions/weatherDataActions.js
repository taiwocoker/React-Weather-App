import { toast } from 'react-toastify'
import * as types from './actionTypes'
import weatherDataApi from '../../api/weatherDataApi'
import LoadingAction from "./loadingActions";

export const loadWeatherSuccess = (weatherData) => ({
  type: types.SET_WEATHER_DATA,
  weatherData,
})

function loadWeatherData(){
  return async (dispatch) => {
    try {
      const data = await weatherDataApi()
      if (data) {
        dispatch(LoadingAction(false))
        dispatch(loadWeatherSuccess(data.list))
      } else {
        dispatch(LoadingAction(false))
        dispatch(loadWeatherSuccess({}))
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`)
    }
  }
}
export default loadWeatherData;