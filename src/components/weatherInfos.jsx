import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from '../redux/actions/loadingActions'
import { Paginate } from '../helpers/Pagination'
import WeatherInfo from './weatherInfo'

const WeatherInfos = () => {
  const [currentTemp, setCurrentTemp] = useState('f')
  const dispatch = useDispatch()
  const weatherData = useSelector(({ ForecastData, Loading }) => ({
    ForecastData,
    Loading,
  }))
  const [weatherState, setWeatherState] = useState([])
  const [page, setPage] = useState(0)
  const [rawPagination, setRawPagination] = useState([])

  useEffect(() => {
    dispatch(WeatherDataAction())
    dispatch(LoadingAction(false))
  }, [])

  useEffect(() => {
    if (weatherData.ForecastData) {
      setRawPagination(Paginate(weatherData.ForecastData))
      setWeatherState(Paginate(weatherData.ForecastData)[page])
    }
  }, [weatherData.ForecastData])

  useEffect(() => {
    if (rawPagination.length > 0) setWeatherState(rawPagination[page])
  }, [page])

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > rawPagination.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = rawPagination.length - 1
      }
      return prevPage
    })
  }

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
          onChange={() => setCurrentTemp('c')}
        />
        <label htmlFor='cel'>Celcius</label>
        <br />
        <input
          type='radio'
          id='f'
          name='temperature'
          value='f'
          checked={currentTemp === 'f'}
          onChange={() => setCurrentTemp('f')}
        />
        <label htmlFor='fah'>Fahrenheit</label>
        <br />
      </div>

      <div className='my-5 d-flex'>
        {page > 0 && (
          <div className=' d-flex justify-content-start'>
            <button className='' onClick={prevPage}>
              Previous
            </button>
          </div>
        )}
        {page === 0 && (
         <div className=' d-flex justify-content-end'>
          <button className='' onClick={nextPage}>
            Next
          </button>
          </div>
        )}
      </div>

      {/* {console.log(weatherData.ForecastData)} */}
      <section className='d-flex justify-content-between'>
        {weatherState.map((value, i) => (
          <div key={i}>
            <WeatherInfo value={value} currentTemp={currentTemp} />
          </div>
        ))}
      </section>
    </div>
  )
}
export default WeatherInfos
