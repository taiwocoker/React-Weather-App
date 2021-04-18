import { temperatureConverter } from '../../helpers/temperatureConverter'

test('is the function for converting kelvin exists', () => {
  expect(temperatureConverter).toBeDefined()
})

test('273 kelvin should be 31.7 fahrenheit', () => {
  expect(temperatureConverter(273)).toBe('31.7')
})

test('273 kelvin should be -0.1 degree celsius', () => {
  expect(temperatureConverter(273, true)).toBe('-0.1')
})

