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

const data = await getData(getCurrentDate(), getEndDate())
