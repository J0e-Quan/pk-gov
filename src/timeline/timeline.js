function displayCurrentYear() {
  const allHolidayHeading = document.querySelector('.all-ph .heading')
  const currentDate = new Date
  const currentYear = currentDate.getFullYear()
  allHolidayHeading.textContent += " (" + currentYear + ")"
}

function getCurrentDate() {
  const currentDate = new Date
  // en-CA region uses YYYY-MM-DD by default, which is the same format used by the calendar API
  return currentDate.toLocaleDateString('en-CA')
}

function getEndDate() {
  const currentDate = new Date
  const currentYear = currentDate.getFullYear()
  // last day of every year is always Dec 31st
  return currentYear + "-12-31"
}

async function getData(currentDate, endDate) {
  try {
    const response = await fetch("https://mycal-api.huijun00100101.workers.dev/v1/holidays/between?start=" + currentDate + "&end=" + endDate + "&state=penang")
    const data = response.json()
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

displayCurrentYear()
const apiResponse = await getData(getCurrentDate(), getEndDate())
// 'data' used in code excludes the 'meta' object included in the API response as the 'meta' object is unused
const data = apiResponse.data
showNextHoliday()
showAllHolidays()

function showNextHoliday() {
  const container = document.querySelector('.next-ph')
  const loader = document.querySelector('.next-ph-loader')
  loader.remove()
  const holidayName = document.createElement('h3')
  holidayName.classList.add('next-ph-name')
  // if data doesn't contain anything, there are no holidays left, a message is shown
  if (data.length === 0 ) {
    const currentDate = new Date
    holidayName.textContent = "No more holidays for " + currentDate.getFullYear() + " :("
    container.appendChild(holidayName)
    const holidayDate = document.createElement('p')
    holidayDate.classList.add('next-ph-date')
    holidayDate.textContent = "Timeline will be updated with new information on the first day of " + (currentDate.getFullYear() + 1) + "!"
    container.appendChild(holidayDate)
    return
  }
  holidayName.textContent = data[0].name.en
  container.appendChild(holidayName)
  const holidayDate = document.createElement('p')
  holidayDate.classList.add('next-ph-date')
  const date = getHolidayDate(data[0].date)
  const daysLeft = getDaysLeft(data[0].date)
  holidayDate.textContent = "on " + date + " (" + daysLeft + " days from today)"
  container.appendChild(holidayDate)
}

function getHolidayDate(inputDate) {
  const date = new Date(inputDate)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getDaysLeft(inputDate) {
  // holiday date and current date are converted to milliseconds, the difference is divided by MS_PER_DAY
  // to get number of days between the two dates
  const holidayDate = new Date(inputDate)
  const currentDate = new Date
  const MS_PER_DAY = 1000 * 60 * 60 * 24
  // Math.abs() gives absolute value to avoid negative numbers
  const msDiff = Math.abs(holidayDate - currentDate)
  return Math.round(msDiff / MS_PER_DAY)
}

function showAllHolidays() {
  const container = document.querySelector('.all-ph')
  const loader = document.querySelector('.all-ph-loader')
  loader.remove()

}