import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherDataAction from '../redux/actions/weatherDataActions'
import LoadingAction from "../redux/actions/loadingActions";


const WeatherInfo = () => {

 const dispatch = useDispatch()
 const weatherData = useSelector(({ ForecastData, Loading }) => ({
   ForecastData,
   Loading,
 }))
console.log(weatherData.ForecastData, weatherData.Loading)
 useEffect(() => {
  dispatch(WeatherDataAction())
  dispatch(LoadingAction(false))
 }, [])
 if(weatherData.Loading) return <h1>Loading...</h1>
 console.log(weatherData.ForecastData)
 return (
  <div>
   Somoye
  </div>
 )
}

export default WeatherInfo
