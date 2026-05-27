import '../assets/styles/global.css'
import '../assets/styles/weather.css'
import sunny from '../assets/weather-icons/sunny.svg'
import night from '../assets/weather-icons/night.svg'
import cloudy from '../assets/weather-icons/cloudy.svg'
import sunnyCloudy from '../assets/weather-icons/sunny-cloudy.svg'
import nightCloudy from '../assets/weather-icons/night-cloudy.svg'
import rain from '../assets/weather-icons/rain.svg'
import thunderstorm from '../assets/weather-icons/thunderstorm.svg'
import warning from '../assets/weather-icons/warning.svg'
import generic from '../assets/weather-icons/generic.svg'

const forecastWeek = document.querySelector('.forecast-week.content')

async function getData() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=5.4112&longitude=100.3354&daily=weather_code,apparent_temperature_max,precipitation_probability_max&hourly=apparent_temperature,precipitation_probability,weather_code,is_day&current=apparent_temperature,weather_code,precipitation,is_day&timezone=Asia%2FSingapore')
    const data = response.json()
    // data cannot be checked with .ok because it has been parsed into json
    if (!response.ok) {
      console.error(data.reason)
      return null
    }
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

function checkData(data) {
  console.log(data)
  if (data === null) {
    return alert("There was an error in fetching weather data! Please make sure you're online and refresh the page to try again.")
  } 
  showCurrentWeather()
  showForecastToday()
}

function determineWeather(weatherCode, isDay){
  const weather = {
    icon: generic,
    condition: 'Unable to get weather information',
  }
  // clear sky
  if ((weatherCode === 0 || weatherCode === 1) && isDay) {
    weather.icon = sunny
    weather.condition = 'Clear sky'
  } else if ((weatherCode === 0 || weatherCode === 1) && !isDay) {
    weather.icon = night
    weather.condition = 'Clear sky'
  } 
  // partly cloudy
  if (weatherCode === 2 && isDay) {
    weather.icon = sunnyCloudy
    weather.condition = 'Partly cloudy'
  } else if (weatherCode === 2 && !isDay) {
    weather.icon = nightCloudy
    weather.condition = 'Partly cloudy'
  } 
  // cloudy 
  if (weatherCode === 3 || weatherCode === 45 || weatherCode === 48) {
    weather.icon = cloudy
    weather.condition = 'Cloudy'
  }  
  // rain
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 80 || weatherCode === 81) {
    weather.icon = rain
    weather.condition = 'Raining'
  } 
  // thunderstorm
  if (weatherCode === 82 || weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    weather.icon = thunderstorm
    weather.condition = 'Thunderstorms'
  } 
  return weather
}

function showCurrentWeather() {
  const currentWeatherLoader = document.querySelector('.current-weather.loader')
  currentWeatherLoader.remove()
  const weather = determineWeather(data.current.weather_code, data.current.is_day)
  const currentWeather = document.querySelector('.current-weather.content')
  const currentWeatherIcon = document.createElement('img')
  currentWeatherIcon.classList.add('current-weather', 'icon')
  currentWeatherIcon.src = weather.icon
  currentWeather.appendChild(currentWeatherIcon)
  const currentWeatherText = document.createElement('div')
  currentWeatherText.classList.add('current-weather', 'text')
  const currentWeatherTemp = document.createElement('h3')
  currentWeatherTemp.classList.add('current-weather', 'temp')
  currentWeatherTemp.textContent = data.current.apparent_temperature + '°C'
  currentWeatherText.appendChild(currentWeatherTemp)
  const currentWeatherCondition = document.createElement('p')
  currentWeatherCondition.classList.add('current-weather', 'condition')
  currentWeatherCondition.textContent = weather.condition
  currentWeatherCondition.textContent += ', with ' + (data.current.precipitation * 100) + '% chance of rain'
  currentWeatherText.appendChild(currentWeatherCondition)
  currentWeather.appendChild(currentWeatherText)
}

function showForecastToday() {
  const forecastTodayLoader = document.querySelector('.forecast-today.loader')
  forecastTodayLoader.remove()
  const forecastToday = document.querySelector('.forecast-today.content')

}

const data = await getData()
checkData(data)