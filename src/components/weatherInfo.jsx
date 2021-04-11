import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from '../redux/actions/loadingActions'
import { dateConverter } from '../helpers/dateConverter'
import { averageTemperature } from '../helpers/averageTemperature'
import { temperatureConverter } from '../helpers/temperatureConverter'
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri'
import './weather.style.css'

const WeatherInfo = ({ value, currentTemp }) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <article
      style={{
        border: '1px solid blue',
        padding: '20px',
        cursor: 'pointer',
      }}
    >
      <div>
        <h6>
          Temp: {' '}
          {averageTemperature(value)[currentTemp]}
          {currentTemp === 'c' ? <RiCelsiusFill /> : <RiFahrenheitFill />}
        </h6>
        <h6>Date: {' '} 
          {dateConverter(value[0].dt).dateFormat}</h6>

        {showMore ? (
          <>
            <p>{value[0].weather[0].main}</p>
            <p>{value[0].weather[0].description}</p>
          </>
        ) : (
          <button
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => setShowMore(!showMore)}
          >
            ...
          </button>
        )}
      </div>
    </article>
  )
}
export default WeatherInfo
