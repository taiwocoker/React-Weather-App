import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Weather from './components/weather'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './helpers/theme'


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Weather />
      </ThemeProvider>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
  )
}

export default App
