import '../assets/styles/global.css'
import '../assets/styles/weather.css'

const currentWeather = document.querySelector('.current-weather.content')
const forecastToday = document.querySelector('.forecast-today.content')
const forecastWeek = document.querySelector('.forecast-week.content')

async function getData() {
  const data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=5.4112&longitude=100.3354&daily=weather_code,apparent_temperature_max&hourly=precipitation_probability,weather_code,is_day,apparent_temperature&current=is_day,precipitation,weather_code,apparent_temperature&timezone=Asia%2FSingapore').then(function(response) {
      return response.json()
    }).then(function(response) {
      return response
    }).catch(function(error) {
      console.log(error)
      alert('There was an error fetching weather data. Please ensure you are online, and refresh the page to try again.')
    })
  return data
}

function displayData(data) {
  console.log(data)
}

const data = await getData()
displayData(data)