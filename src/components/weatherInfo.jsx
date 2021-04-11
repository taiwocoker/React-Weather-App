import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from '../redux/actions/loadingActions'
import { dateConverter } from '../helpers/dateConverter'
import { averageTemperature } from '../helpers/averageTemperature'
import { temperatureConverter } from '../helpers/temperatureConverter'
import './weather.style.css';

const WeatherInfo = () => {
  const [currentTemp, setCurrentTemp] = useState('f')
  const dispatch = useDispatch()
  const weatherData = useSelector(({ ForecastData, Loading }) => ({
    ForecastData,
    Loading,
  }))
  const [weatherState, setWeatherState] = useState({ indices: [] })

  const [showMoreData, setShowMoreData] = useState({state: false, value: null})

  const toggleShowMore = (index) => {
    return ()=> {
      if(showMoreData.state){
        setShowMoreData({state: false, value: null})
      }else setShowMoreData({state: true, value: index})
    }
  }

  useEffect(() => {
    dispatch(LoadingAction(true))
    dispatch(WeatherDataAction())
  }, [])
  useEffect(() => {
    setWeatherState({
      indices: Object.keys(weatherData.ForecastData),
    })
  }, [weatherData.ForecastData])

  // console.log(weatherData, weatherState, showMoreData)

  if (weatherData.Loading) return <h1>Getting Weather Data...</h1>
  return (
    <div className={'weather'}>
      <div>
        <input
          type='radio'
          id='c'
          name='temperature'
          value='c'
          checked={currentTemp === 'c'}
          onClick={() => setCurrentTemp('c')}
        />
        <label htmlFor='cel'>Celcius</label>
        <br />
        <input
          type='radio'
          id='f'
          name='temperature'
          value='f'
          checked={currentTemp === 'f'}
          onClick={() => setCurrentTemp('f')}
        />
        <label htmlFor='fah'>Fahrenheit</label>
        <br />
      </div>
      <section className='d-flex justify-content-between'>
        {weatherState.indices.length &&
          weatherState.indices.slice(0,3).map((index, i) => (
            <div
              key={i}
              id={index}
              onClick={toggleShowMore(index)}
              style={{
                border: '1px solid blue',
                padding: '20px',
                cursor: 'pointer',
              }}
            >
              <div>
                <h3>
                  {
                    dateConverter(weatherData.ForecastData[index][0].dt)
                      .dateFormat
                  }
                </h3>
                <h6>
                  avg: {
                    averageTemperature(weatherData.ForecastData[index])[
                      currentTemp
                    ]
                  }
                  {currentTemp.toUpperCase()}
                </h6>
              </div>
              <div className={`weather-extra ${showMoreData.value == index? 'weather-extra--active':''}`}>
                {weatherData.ForecastData[index].map((x, i) => (
                  <div key={i} id={x.dt}>
                    <div>{dateConverter(x.dt)
                    .date.toDateString()}</div>
                    <div>{temperatureConverter(x.tempKev, currentTemp === 'c')}{currentTemp}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>
    </div>
  )
}
export default WeatherInfo
