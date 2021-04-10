import { dateConverter } from './dateConverter'
import { temperatureConverter } from './temperatureConverter'
/**
 * Reshapes response object from open weather api for this app
 * @param {object} response
 * @returns {object}
 */
export const resolveResponse = (response) => {
  try {
    const { cod, message, cnt, city, list } = response
    const _list = list.reduce((acc, cur, i, arr) => {
      const _pos = dateConverter(cur.dt).calDate()
      acc[_pos] = []
      for (let x of arr) {
        // check date match, then group
        if (dateConverter(x.dt).calDate() === dateConverter(cur.dt).calDate()) {
          acc[_pos].push({
            tempkev: x.main.temp,
            tempCel: temperatureConverter(x.main.temp, true),
            tempFahr: temperatureConverter(x.main.temp),
            ...x,
          })
        }
      }
      return acc
    }, {})
    return {
      cod,
      message,
      cnt,
      list: _list,
      city,
    }
  } catch (e) {
    // throw new Error('No Response object found!!')
    return {}
  }
}
