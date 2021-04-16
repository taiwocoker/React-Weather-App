import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from '../redux/actions/loadingActions'
import { Paginate } from '../helpers/Pagination'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import WeatherInfo from './weatherInfo'
import Loader from 'react-loader-spinner'
import {
  Radio,
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
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      fontWeight: 700,
    },
    goal: {
      backgroundColor: theme.palette.secondary.main,
    },
  })
)



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

  const classes = useStyles();
  const theme = useTheme();

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
      <div className='' style={{ backgroundColor: '#e6f3f8' }}>
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
        {/* <div>
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
        </div> */}

        <div className='my-5 d-flex'>
          {page > 0 && (
            <div className=' d-flex justify-content-start'>
              <button className='' onClick={prevPage}>
                <AiOutlineArrowLeft/>
              </button>
            </div>
          )}
          {page === 0 && (
            <div className=' d-flex justify-content-end'>
              <button className='' onClick={nextPage}>
                <AiOutlineArrowRight/>
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
      
    </>
  )
}
export default WeatherInfos
