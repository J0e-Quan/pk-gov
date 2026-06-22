import { supabase } from "./pibss-common.js";

async function getEntries() {
  const { data, error } = await supabase
    .from('database')                   // 1. Target table
    .select('*')                        // 2. Fetch all columns
    .order('name', { ascending: true }) // 3. Sort alphabetically (A-Z)
    .ilike('location', location)        // 4. Filter by location 
    .ilike('type', type)                // 5. Filter by type

  if (error) {
    return console.error('Error fetching data:', error.message)
  }

  return data
}

function clearEntries() {
  const entries = document.querySelector('.entries')
  entries.innerHTML = ''
}

function updateResultsText() {
  const resultsText = document.querySelector('.pibss-category')
  resultsText.textContent = 'Showing ' + locationText + ' ' + typeText + ' from ' + orderText
}

function renderEntries(data) {
  clearEntries()
  if (data === null) {
    return console.error('no data received!')
  }
  const container = document.querySelector('.entries')
  updateResultsText()
  if (data.length === 0) {
    const emptyMessage = document.createElement('h3')
    emptyMessage.classList.add('pibss-empty-message')
    emptyMessage.textContent = "We couldn't find any plushies matching your filtering options."
    container.appendChild(emptyMessage)
    return 
  }
  for (const entry of data) {
    const card = document.createElement('div')
    card.classList.add('pibss-card')
    const picture = document.createElement('img')
    picture.classList.add('pibss-picture')
    picture.src = entry.photo_url
    card.appendChild(picture)
    const cardText = document.createElement('div')
    cardText.classList.add('pibss-card-text')
    const name = document.createElement('h2')
    name.classList.add('pibss-name')
    name.textContent = entry.name
    cardText.appendChild(name)
    const type = document.createElement('p')
    type.classList.add('pibss-type')
    type.textContent = 'Type: ' + entry.type 
    cardText.appendChild(type)
    const country = document.createElement('p')
    country.classList.add('pibss-country')
    country.textContent = 'Origin Country: ' + entry.country_of_origin
    cardText.appendChild(country)
    const date = document.createElement('p')
    date.classList.add('pibss-date')
    const dateRaw = new Date(entry.date_joined)
    const formattedDate = dateRaw.toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})
    date.textContent = 'Date Joined: ' + formattedDate
    cardText.appendChild(date)
    const location = document.createElement('p')
    location.classList.add('pibss-location')
    location.textContent = 'Residence: ' + entry.location
    cardText.appendChild(location)
    card.appendChild(cardText)
    container.appendChild(card) 
  }
}

async function getPlushieTypes() {
  const { data, error } = await supabase
    .from('unique_types')                  // 1. Target 'unique_types' view
    .select('*')                           // 2. Get all unique values from it

  if (error) {
    return console.error('Error fetching data:', error.message)
  }

  // converts array of objects into an array for easier looping
  const dataArray = data.map(item => item.type)

  populateTypes(dataArray)
}

function populateTypes(data) {
  for (const type of data) {
    const typeInput = document.getElementById('type')
    const typeOption = document.createElement('option')
    typeOption.value = type
    typeOption.textContent = type
    typeInput.appendChild(typeOption)
  }
}

// initialise default values
let order = 'a-z'
let location = '%'
let type = '%'
let orderText = 'A to Z'
let locationText = 'All'
let typeText = 'Plushies'

renderEntries( await getEntries())
getPlushieTypes()

// code for handling filter changes
const orderInput = document.getElementById('order')
const locationInput = document.getElementById('location')
const typeInput = document.getElementById('type')

orderInput.addEventListener('change', updateOrder)
locationInput.addEventListener('change', updateLocation)
typeInput.addEventListener('change', updateType)

async function updateOrder(e) {
  order = e.target.value
}

async function updateLocation(e) {
  if (e.target.value === '%') {
    location = e.target.value
    locationText = 'All'
  } else {
    location = '%' + e.target.value + '%'
    locationText = e.target.value
  }
  renderEntries( await getEntries())
}

async function updateType(e) {
  if (e.target.value === '%') {
    type = e.target.value
    typeText = 'Plushies'
  } else {
    type = '%' + e.target.value + '%'
    typeText = e.target.value + 's'
  }
  renderEntries( await getEntries())
}