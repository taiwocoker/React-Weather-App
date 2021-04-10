import { temperatureConverter } from './temperatureConverter'
/**
 * Get average temperature in kelvin, Fahrenheit or Celsius
 * @param {object[]} resolveResponseWeatherData -  Resolved response Object from api
 * @return {k: number, c: number, f: number}
 */
const averageTempeture = (resolveResponseWeatherData) => {
  const ans = resolveResonseWeatherData.reduce((acc, cur) => {
    acc += cur.tempKev
    return acc
  }, 0)
  return {
    k: ans,
    c: temperatureConverter(ans, true),
    f: temperatureConverter(ans),
  }
}
