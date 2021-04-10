import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from '../redux/actions/loadingActions'
import { dateConverter } from '../helpers/dateConverter';

const WeatherInfo = () => {
  const [currentTemp, setCurrentTemp] = useState('fah')
  const dispatch = useDispatch()
  const weatherData = useSelector(({ ForecastData, Loading }) => ({
    ForecastData,
    Loading,
  }))
  useEffect(() => {
    dispatch(WeatherDataAction())
    dispatch(LoadingAction(false))
  }, [])

  if (weatherData.Loading) return <h1>Loading...</h1>

  return (
    <>
      <div>
        <input
          type='radio'
          id='cel'
          name='temperature'
          value='cel'
          onClick={() => setCurrentTemp('cel')}
        />
        <label htmlFor='cel'>Celcius</label>
        <br />
        <input
          type='radio'
          id='fah'
          name='temperature'
          value='fah'
          onClick={() => setCurrentTemp('fah')}
        />
        <label htmlFor='fah'>Fahrenheit</label>
        <br />
      </div>
      <section className='d-flex justify-content-between'>
        {weatherData.ForecastData.map((data, index) => {
          return (
            <article key={index} className='border '>
              {currentTemp === 'fah' ? (
                <>
                  <p>{`Temp: ${(
                    ((data.main.temp - 273.15) * 9) / 5 +
                    32
                  ).toFixed(1)}F`}</p>
                  <p>{dateConverter(data.dt).dateFormat}</p>
                  <p>{data.weather[0].main}</p>
                  <p>{data.weather[0].description}</p>
                </>
              ) : (
                <>
                  <small>{`Temp: ${(data.main.temp - 273.15).toFixed(
                    1
                  )}C`}</small>

                  <small>{dateConverter(data.dt).dateFormat}</small>
                </>
              )}
            </article>
          )
        })}
      </section>
    </>
  )
}

export default WeatherInfo
