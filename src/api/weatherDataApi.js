import { handleResponse, handleError } from './apiUtils'
const weatherUrl =
  'http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40'

const getWeatherData = async () =>
  fetch(weatherUrl).then(handleResponse).catch(handleError)

export default getWeatherData
