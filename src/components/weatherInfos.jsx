import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from '../redux/actions/loadingActions'
import { Paginate } from '../helpers/pagination'
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri'
import { temperatureConverter } from '../helpers/temperatureConverter'
import BarChart from './bar'
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import WeatherInfo from './weatherInfo'
import Loader from 'react-loader-spinner'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import {
  Radio,
  Icon,
  RadioGroup,
  Button,
  FormControlLabel,
  FormControl,
  Grid,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  useTheme,
  CircularProgress,
  Paper,
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      fontWeight: 700,
    },
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

const WeatherInfos = () => {
  const [currentTemp, setCurrentTemp] = useState('f')
  const [bar, setBar] = useState([{ time: '', temperature: '' }])
  const dispatch = useDispatch()
  const weatherData = useSelector(({ ForecastData, Loading }) => ({
    ForecastData,
    Loading,
  }))
  const [weatherState, setWeatherState] = useState([])
  const [page, setPage] = useState(0)
  const [rawPagination, setRawPagination] = useState([])
  const [barChange, setBarChange] = useState(0)
  const [city, setCity] = useState('Munich')
  const searchValue = useRef('')

  useEffect(() => {
    dispatch(WeatherDataAction(city))
  }, [city])

  const handleClick = (number) => {
    if (page === 0) {
      setBarChange(number)
    } else {
      setBarChange(number + 3)
    }
  }
  useEffect(() => {
    if (weatherData.ForecastData) {
      setRawPagination(Paginate(weatherData.ForecastData))
      setWeatherState(Paginate(weatherData.ForecastData)[page])
      let s = weatherData.ForecastData[barChange]
      const newS = s.map((res, idx) => {
        return {
          time: res.dt_txt.split(' ')[1],
          temperature: res.tempKev,
        }
      })
      setBar([...newS])
      console.log(bar)
    }
  }, [weatherData.ForecastData, barChange])
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setCity(searchValue.current.value)
  }

  const classes = useStyles()
  const theme = useTheme()

  if (weatherData.Loading)
    return (
      <Grid
        item
        container
        spacing={0}
        alignItems='center'
        justify='center'
        className={classes.goal}
      >
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
          style={{ minHeight: '95vh' }}
        >
          <Container maxWidth='xs'>
            <Container maxWidth='xs'>
              <Grid container direction='column' alignItems='center'>
                {/* <Typography variant='h5' className={classes.header}>
                  Loading Page
                </Typography> */}
                <CircularProgress color='primary' size={80} />
              </Grid>
            </Container>
          </Container>
        </Grid>
      </Grid>
    )
  return (
    <>
      <Grid
        item
        container
        spacing={0}
        alignItems='center'
        justify='center'
        style={{ minHeight: '95vh' }}
        className={classes.goal}
      >
        {/* <Grid
          container
          spacing={3}
          direction='column'
          alignItems='center'
          justify='center'
          style={{ minHeight: '95vh' }}
        > */}
        <Container maxWidth='lg'>
          <Grid container item direction='column'>
            <FormControl component='fieldset'>
              <RadioGroup aria-label='gender' name='gender1' row>
                <FormControlLabel
                  value='c'
                  control={<Radio color='primary' />}
                  label='Celcius'
                  name='temperature'
                  onChange={() => setCurrentTemp('c')}
                  checked={currentTemp === 'c'}
                  id='c'
                  color='primary'
                />
                <FormControlLabel
                  value='f'
                  control={<Radio color='primary' />}
                  label='Fahrenheit'
                  id='f'
                  name='temperature'
                  checked={currentTemp === 'f'}
                  onChange={() => setCurrentTemp('f')}
                />
              </RadioGroup>
            </FormControl>

            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Enter City'
                ref={searchValue}
                required
              />

              <button type='submit'>Go</button>
            </form>

            <div className='my-5 d-flex'>
              {page > 0 && (
                <div className=' d-flex justify-content-start'>
                  <button className='' onClick={prevPage}>
                    <ArrowBackIcon color='primary' />
                  </button>
                </div>
              )}
              {page === 0 && (
                <div className=' d-flex justify-content-end'>
                  <button className='' onClick={nextPage}>
                    <ArrowForwardIcon color='primary' />
                  </button>
                </div>
              )}
            </div>

            {/* <section className='d-flex justify-content-center'> */}
            <section className={classes.root}>
              {weatherState.map((value, i) => (
                <Paper elevation={5} key={i}>
                  <WeatherInfo
                    value={value}
                    currentTemp={currentTemp}
                    click={() => handleClick(i)}
                  />
                </Paper>
              ))}
            </section>

            <BarChart data={bar} />
            {/* </section> */}
          </Grid>
        </Container>
        {/* </Grid> */}
      </Grid>
    </>
  )
}
export default WeatherInfos
