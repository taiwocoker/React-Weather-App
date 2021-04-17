import { handleResponse, handleError } from './apiUtils';

const getWeatherData = async (city) =>
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`

  )
    .then(handleResponse)
    .catch(handleError)

export default getWeatherData;
