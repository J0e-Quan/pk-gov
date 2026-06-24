import { supabase } from "./pibss-common.js";
import { Chart, Colors, PieController, ArcElement, Tooltip, Legend } from "chart.js";

// provides automatic chart colours
Chart.register(Colors, PieController, ArcElement, Tooltip, Legend);

async function getData() {
  const { data, error } = await supabase
      .from('database')
      .select('*')

  if (error) {
    return console.error('Error fetching data:', error.message)
  }

  return data
}

function getTotalCitizens() {
  return data.length
}

function getNewCitizens() {
  const currentYearStart = new Date().getFullYear()
  const newCitizensArray = data.filter((plushie) => new Date(plushie.date_joined).getFullYear() === currentYearStart)
  return newCitizensArray.length
}

function sortType() {
  // Set automatically removes all duplicates
  const typesArray = Array.from(new Set(data.map((plushie) => plushie.type)))
  const types = typesArray.map(type => {
    return {
      name: type,
      population: undefined
    }})
  for (let i = 0; i < types.length; i++) {
    const typePopulation = data.filter((plushie) => plushie.type === types[i].name)
    types[i].population = typePopulation.length
  }
  types.sort((a, b) => b.population - a.population)
  return types
}

function getLargestType(types) {
  return types[0].name + 's'
}

function sortLocation() {
  const locations = [
    {name: 'Big Tent Plains', population: undefined}, 
    {name: 'Big Tent Stacks', population: undefined}, 
    {name: 'The Studio', population: undefined}, 
    {name: 'The Bedroom', population: undefined}, 
    {name: 'The Sofa', population: undefined}, 
  ]
  for (let i = 0; i < locations.length; i++) {
    const locationPopulation = data.filter((plushie) => plushie.location === locations[i].name)
    locations[i].population = locationPopulation.length
  }
  locations.sort((a, b) => b.population - a.population)
  return locations
}

function getLargestLocation(locations) {
  return locations[0].name
}

function displayStatistics() {
  const totalCitizens = getTotalCitizens()
  const totalCitizensNumber = document.querySelector('.total-citizens.value')
  totalCitizensNumber.textContent = totalCitizens
  const newCitizens = getNewCitizens()
  const newCitizensNumber = document.querySelector('.new-citizens.value')
  newCitizensNumber.textContent = newCitizens
  if (newCitizens <= 1) {
    const newCitizensText = document.querySelector('.new-citizens.text')
    newCitizensText.textContent = 'new citizen joined the Plushie Kingdom this year'
  }
  const largestType = getLargestType(sortedTypes)
  const largestTypeText = document.querySelector('.largest-type.value')
  largestTypeText.textContent = largestType
  const largestLocation = getLargestLocation(sortedLocations)
  const largestLocationText = document.querySelector('.largest-location.value')
  largestLocationText.textContent = largestLocation
}

function displayCharts() {
 displayLocationDistributionChart()
}

function displayLocationDistributionChart() {
  return new Chart(
    document.getElementById('location-distribution'), 
    {
      type: 'pie',
      data: {
        labels: sortedLocations.filter(location => location.population > 0).map(location => location.name),
        datasets: [{
          label: 'Residents',
          data: sortedLocations.filter(location => location.population > 0).map(location => location.population),
        }]
      }
    }
  )
}

const data = await getData()
const sortedTypes = sortType()
const sortedLocations = sortLocation()
displayStatistics()
displayCharts()