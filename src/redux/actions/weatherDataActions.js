import { toast } from 'react-toastify'
import * as types from './actionTypes'
import weatherDataApi from '../../api/weatherDataApi'
import LoadingAction from './loadingActions'

export const loadWeatherSuccess = (weatherData) => ({
  type: types.SET_WEATHER_DATA,
  weatherData,
})

function loadWeatherData(city) {
  return async (dispatch) => {
    try {
      const data = await weatherDataApi(city)
      if (data) {
        let outputData = []
        for (const i in data) {
          outputData.push(data[i])
        }
        dispatch(loadWeatherSuccess(outputData))
        dispatch(LoadingAction(false))
      } else {
        dispatch(loadWeatherSuccess(null))
        dispatch(LoadingAction(false))
      }
    } catch (error) {
      dispatch(loadWeatherSuccess(null))
      dispatch(LoadingAction(false))
      toast.error(`Whoops!, ${error.message} occured`)
    }
  }
}
export default loadWeatherData
