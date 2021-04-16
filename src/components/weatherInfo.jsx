import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Container,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  Paper,
} from '@material-ui/core'
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { dateConverter } from '../helpers/dateConverter'
import { averageTemperature } from '../helpers/averageTemperature'
import { temperatureConverter } from '../helpers/temperatureConverter'
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri'
import './weather.style.css'

const useStyles = makeStyles((theme) =>
  createStyles({
    goal: {
      backgroundColor: theme.palette.secondary.main,
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  })
)

const WeatherInfo = ({ value, currentTemp, click }) => {
  const [showMore, setShowMore] = useState(false)
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div onClick={click}>
          <h6>
            Temp: {averageTemperature(value)[currentTemp]}
            {currentTemp === 'c' ? <RiCelsiusFill /> : <RiFahrenheitFill />}
          </h6>
          <h6>Date: {dateConverter(value[0].dt).dateFormat}</h6>

          {showMore ? (
            <>
              <p>{value[0].weather[0].main}</p>
              <p>{value[0].weather[0].description}</p>
            </>
          ) : (
            ''
          )}
          <button
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'show less' : '...'}
          </button>
      </div>
    </>
  )
}
export default WeatherInfo
