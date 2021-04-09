import { toast } from 'react-toastify'
import * as types from './actionTypes'
import * as weatherDataApi from '../../api/weatherDataApi'
export const loadWeatherSuccess = (weatherData) => ({
  type: types.SET_WEATHER_DATA,
  weatherData,
})
export function loadWeatherData() {
  return async (dispatch) => {
    try {
      const data = await weatherDataApi()
      // const { meals } = data
      if (data) {
        // const {
        //   strMeal: name,
        //   strMealThumb: image,
        //   strArea: info,
        //   strCategory: category,
        //   strInstructions: instructions,
        //   strIngredient1,
        //   strIngredient2,
        //   strIngredient3,
        //   strIngredient4,
        //   strIngredient5,
        // } = meals[0]
        // const ingredients = [
        //   strIngredient1,
        //   strIngredient2,
        //   strIngredient3,
        //   strIngredient4,
        //   strIngredient5,
        // ]
        // const newMeal = {
        //   name,
        //   image,
        //   info,
        //   category,
        //   instructions,
        //   ingredients,
        // }
        dispatch(loadWeatherSuccess(data))
      } else {
        dispatch(loadWeatherSuccess(null))
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`)
    }
  }
}
