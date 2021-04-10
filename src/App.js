import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherInfo from "./components/weatherInfo";

function App() {
  return (
    <>
      <WeatherInfo/>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
