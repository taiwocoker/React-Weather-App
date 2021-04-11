import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from '../redux/actions/loadingActions'
import { Paginate } from '../helpers/Pagination'
import WeatherInfo from './weatherInfo'
import Loader from 'react-loader-spinner'

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

  if (weatherData.Loading)
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader
          type='Puff'
          color='#00BFFF'
          height={100}
          width={100}
          // timeout={000} //3 secs
        />
      </div>
    )
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

      <section className='d-flex justify-content-center'>
        {weatherState.map((value, i) => (
          <div key={i} className='m-3'>
            <WeatherInfo value={value} currentTemp={currentTemp} />
          </div>
        ))}
      </section>
    </div>
  )
}
export default WeatherInfos
