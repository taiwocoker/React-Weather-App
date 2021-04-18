import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import { temperatureConverter } from '../helpers/temperatureConverter'

import { Paginate, NextPage, PrevPage } from '../helpers/Pagination'
import BarChart from './bar'
import WeatherCard from './WeatherCard'
import {
  Hidden,
  Radio,
  TextField,
  RadioGroup,
  Box,
  FormControlLabel,
  FormControl,
  Grid,
  Container,
  createStyles,
  makeStyles,
  Button,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import LoadingScreen from './LoadingScreen'
import PaginationControls from './PaginationControls'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
    },
    cardWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1.5rem',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  })
)

const Weather = () => {
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


  useEffect(() => {
    dispatch(WeatherDataAction(city))
  }, [])

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
          // temperature: res.tempKev,
          temperature: Number(temperatureConverter(res.tempKev, currentTemp === 'c')),
        }
      })
      setBar([...newS])
    }
  }, [weatherData.ForecastData, barChange, currentTemp])
  useEffect(() => {
    if (rawPagination.length > 0) setWeatherState(rawPagination[page])
  }, [page])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(WeatherDataAction(city))
  }

  const handleChange = (e) => {
    setCity(e.target.value)
  };


  const classes = useStyles()

  if (weatherData.Loading) return <LoadingScreen />
  return (
    <Grid
      item
      container
      spacing={0}
      alignItems='center'
      justify='center'
      style={{ minHeight: '95vh' }}
      className={classes.root}
    >
      <Container maxWidth='lg'>
        <Grid container item direction='column' xs={12}>
          <FormControl component='fieldset'>
            <RadioGroup aria-label='gender' name='gender1' row>
              <Box
                display='flex'
                mt='2rem'
                width='100%'
                justifyContent='space-evenly'
              >
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
              </Box>
            </RadioGroup>
          </FormControl>
          <PaginationControls
            page={page}
            nextPage={() => NextPage(setPage, rawPagination)}
            prevPage={() => PrevPage(setPage, rawPagination)}
          >
            <Hidden smDown>
              <form onSubmit={handleSubmit}>
                <Box display='flex' alignItems='center'>
                  <TextField
                    id='standard-basic'
                    label='Enter a city'
                    value={city}
                    onChange={(e) => handleChange(e)}
                    required
                  />

                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    endIcon={<Search>search</Search>}
                    size='large'
                    type='submit'
                  >
                    Go
                  </Button>
                </Box>
              </form>
            </Hidden>
          </PaginationControls>
          <Box className={classes.cardWrapper}>
            {weatherState.map((value, index) => (
              <WeatherCard
                key={value.index}
                value={value}
                currentTemp={currentTemp}
                click={() => handleClick(index)}
              />
            ))}
          </Box>

          <Box mb='2rem'>
            <BarChart data={bar} currentTemp={currentTemp} />
          </Box>
        </Grid>
      </Container>
    </Grid>
  )
}
export default Weather
