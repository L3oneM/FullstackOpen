import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
  const [weather, setWeather] = useState([])

  const APIKEY = '8f273bc094d6f149d4e1bbb8934428cf'
  const hook = () => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${APIKEY}`)
      .then(response => {
        console.log(response.data)
        setWeather({
          temp: response.data.main.temp,
          wind: response.data.wind.speed,
          weather_desc: response.data.weather[0].description,
        })
    })
  }

  useEffect(hook, [])

 console.log(weather)
  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><strong>tempetature: </strong>{weather.temp} Celsius</p>
      <p>{weather.weather_desc}</p>
      <p><strong>wind: </strong>{weather.wind} kph</p>
    </div>
  )
}

export default Weather