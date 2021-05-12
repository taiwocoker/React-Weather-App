import { handleResponse, handleError } from './apiUtils'

const getWeatherData = async (city) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=77c3590e13d0c9ba0f698810bbdb9cfd&cnt=40`
  )
    .then(handleResponse)
    .catch(handleError)

export default getWeatherData
