import WeatherReducer from '../../../redux/reducers/weatherDataReducer'
import * as WeatherActions from '../../../redux/actions/weatherDataActions'

describe('House Reducer', () => {
  it('should update redux state house when passed SET_HOUSE', () => {
    // arrange
    const initialState = { loading: true, weatherData: null }
    const weatherData = {
      id: 2,
      
      Date: '18 Apr 21',
      Temp: '41.3',
      main: 'CLOUD',
      description:
        'OVERCAST CLOUD',
    }
    const action = WeatherActions.loadWeatherSuccess(weatherData)
    // act
    const newState = WeatherReducer(initialState, action)
    // assert
    expect(newState).toEqual(weatherData)
  })
})
