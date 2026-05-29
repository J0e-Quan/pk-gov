import '../assets/styles/global.css'
import '../assets/styles/weather.css'
import sunny from '../assets/weather-icons/sunny.svg'
import night from '../assets/weather-icons/night.svg'
import cloudy from '../assets/weather-icons/cloudy.svg'
import sunnyCloudy from '../assets/weather-icons/sunny-cloudy.svg'
import nightCloudy from '../assets/weather-icons/night-cloudy.svg'
import rain from '../assets/weather-icons/rain.svg'
import thunderstorm from '../assets/weather-icons/thunderstorm.svg'
import generic from '../assets/weather-icons/generic.svg'

async function getData() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=5.4112&longitude=100.3354&daily=weather_code,apparent_temperature_max,precipitation_probability_max&hourly=apparent_temperature,precipitation_probability,weather_code,is_day&current=apparent_temperature,weather_code,is_day&timezone=Asia%2FSingapore')
    const data = response.json()
    // data cannot be checked with .ok because it has been parsed into json, must check response instead
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
  showForecastWeek()
}

function determineWeather(weatherCode, isDay, precipitation){
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
  // check if precipitation is high enough for rain / thunderstorm (if not, show partly cloudy instead)
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82 || weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    if (precipitation <= 30) {
      if (isDay) {
        weather.icon = sunnyCloudy
        weather.condition = 'Partly cloudy'
      } else if (!isDay) {
        weather.icon = nightCloudy
        weather.condition = 'Partly cloudy'
      }
    } else if (precipitation > 30) {
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
    }
  }
  return weather
}

function getCurrentPrecipitation() {
  const currentIndex = data.hourly.time.findIndex((time) => {
    const currentTime = data.current.time.slice(0, -2) + '00'
    return time === currentTime
  })
  return data.hourly.precipitation_probability[currentIndex]
}

function showCurrentWeather() {
  const currentWeatherLoader = document.querySelector('.current-weather.loader')
  currentWeatherLoader.remove()
  const currentPrecipitation = getCurrentPrecipitation()
  const weather = determineWeather(data.current.weather_code, data.current.is_day, currentPrecipitation)
  const currentWeather = document.querySelector('.current-weather.content')
  const currentWeatherIcon = document.createElement('img')
  currentWeatherIcon.classList.add('current-weather', 'icon')
  currentWeatherIcon.src = weather.icon
  currentWeather.appendChild(currentWeatherIcon)
  const currentWeatherTemp = document.createElement('h3')
  currentWeatherTemp.classList.add('current-weather', 'temp')
  currentWeatherTemp.textContent = data.current.apparent_temperature + '°C'
  currentWeather.appendChild(currentWeatherTemp)
  const currentWeatherCondition = document.createElement('p')
  currentWeatherCondition.classList.add('current-weather', 'condition')
  currentWeatherCondition.textContent = weather.condition
  currentWeatherCondition.textContent += ', with ' + currentPrecipitation + '% chance of rain'
  currentWeather.appendChild(currentWeatherCondition)
}

function showForecastToday() {
  const forecastTodayLoader = document.querySelector('.forecast-today.loader')
  forecastTodayLoader.remove()
  const forecastToday = document.querySelector('.forecast-today.content')
  const currentIndex = data.hourly.time.findIndex((time) => {
    const currentTime = data.current.time.slice(0, -2) + '00'
    return time === currentTime
  })
  console.log(currentIndex)
  for (let i = currentIndex; i <= (currentIndex + 24) && i < data.hourly.time.length; i++) {
    const item = document.createElement('div')
    item.classList.add('forecast-today', 'item')
    const weather = determineWeather(data.hourly.weather_code[i], data.hourly.is_day[i], data.hourly.precipitation_probability[i])
    const time = document.createElement('h2')
    time.classList.add('forecast-today', 'time')
    if (i > 23) {
      if (i - 24 === 0) {
        time.textContent = '00:00'
      } else if (i - 24 > 9) {
        time.textContent = (i - 24) + ':00'
      } else {
        time.textContent = '0' + (i - 24) + ":00"
      }
    } else {
      time.textContent = i + ':00'
    }
    item.appendChild(time)
    const icon = document.createElement('img')
    icon.classList.add('forecast-today', 'icon')
    icon.src = weather.icon
    item.appendChild(icon)
    const temp = document.createElement('h3')
    temp.classList.add('forecast-today', 'temp')
    temp.textContent = data.hourly.apparent_temperature[i] + '°C'
    item.appendChild(temp)
    const condition = document.createElement('p')
    condition.classList.add('forecast-today', 'condition')
    condition.textContent = weather.condition + '\n(' + data.hourly.precipitation_probability[i] + '% chance of rain)'
    item.appendChild(condition)
    forecastToday.appendChild(item)
  }
}

function showForecastWeek() {
  const forecastWeekLoader = document.querySelector('.forecast-week.loader')
  forecastWeekLoader.remove()
  const forecastWeek = document.querySelector('.forecast-week.content')
  for (let i = 0; i < 7; i++) {
    const item = document.createElement('div')
    item.classList.add('forecast-week', 'item')
    const weather = determineWeather(data.daily.weather_code[i], data.current.is_day, data.daily.precipitation_probability_max[i])
    const day = document.createElement('h2')
    day.classList.add('forecast-week', 'day')
    // logic for setting day name
    const dateString = data.daily.time[i]
    const dateObject = new Date(dateString)
    day.textContent = dateObject.toLocaleDateString('en-GB', { weekday: 'short' })
    if (i === 0) {
      day.textContent = 'Today'
    }
    item.appendChild(day)
    const icon = document.createElement('img')
    icon.classList.add('forecast-week', 'icon')
    icon.src = weather.icon
    item.appendChild(icon)
    const temp = document.createElement('h3')
    temp.classList.add('forecast-week', 'temp')
    temp.textContent = data.hourly.apparent_temperature[i] + '°C'
    item.appendChild(temp)
    const condition = document.createElement('p')
    condition.classList.add('forecast-week', 'condition')
    condition.textContent = weather.condition + '\n(' + data.daily.precipitation_probability_max[i] + '% chance of rain)'
    item.appendChild(condition)
    forecastWeek.appendChild(item)
  }
}

const data = await getData()
checkData(data)