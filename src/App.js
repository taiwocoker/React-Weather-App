import React, { Suspense, lazy } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const WeatherInfo = lazy(() => import('./components/weatherInfo'))

function App() {
  return (
    <>
      <Suspense fallback={'loading...'}>
        <WeatherInfo />
      </Suspense>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  )
}

export default App
