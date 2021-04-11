import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WeatherInfos from './components/weatherInfos'


function App() {
  return (
    <>
        <WeatherInfos />
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  )
}

export default App
