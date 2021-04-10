import { resolveResponse } from '../helpers/groupWeatherData'

export async function handleResponse(response) {
  if (response.ok) {
    const data = await response.json()
    const result = resolveResponse(data)
    console.log(result)

    return result
  }
  if (response.status === 400) {
    const error = await response.text()
    throw new Error(error)
  }
  throw new Error('Network response was not ok.')
}
export function handleError(error) {
  throw new Error(error)
}
