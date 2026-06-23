import { supabase } from "./pibss-common.js";

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

function getLargestType() {
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
  console.log(types)
  types.sort((a, b) => b.population - a.population)
  console.log(types)
  return types[0].name + 's'
}


function getLargestLocation() {
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
  console.log(locations)
  locations.sort((a, b) => b.population - a.population)
  console.log(locations)
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
  const largestType = getLargestType()
  const largestTypeText = document.querySelector('.largest-type.value')
  largestTypeText.textContent = largestType
  const largestLocation = getLargestLocation()
  const largestLocationText = document.querySelector('.largest-location.value')
  largestLocationText.textContent = largestLocation
}

const data = await getData()
displayStatistics()