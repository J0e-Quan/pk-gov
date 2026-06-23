import { supabase } from "./pibss-common.js";

async function getEntries() {
  const query = supabase
    .from('database')
    .select('*')
    .ilike('location', location)
    .ilike('type', type)
    .ilike('name', search)
    
  if (order === 'A to Z') {
    query.order('name', {ascending: true})
  } else if (order === 'Z to A') {
    query.order('name', {ascending: false})
  } else if (order === 'Newest to Oldest') {
    query.order('date_joined', {ascending: false})
  } else if (order === 'Oldest to Newest') {
    query.order('date_joined', {ascending: true})
  }
  const { data, error } = await query

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
  if (searchText !== '') {
    resultsText.textContent +=  ' matching "' + searchText + '"'
  }
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
    const formattedDate = dateRaw.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})
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
let order = 'A to Z'
let location = '%'
let type = '%'
let search = '%'
let orderText = 'A to Z'
let locationText = 'All'
let typeText = 'Plushies'
let searchText = ''

renderEntries( await getEntries())
getPlushieTypes()

// code for handling filter and search changes
const submitBtn = document.querySelector('.options-submit')
submitBtn.addEventListener('click', updateFilters)

async function updateFilters(){
  updateOrder()
  updateLocation()
  updateType()
  updateSearch()
  renderEntries( await getEntries())
}

function updateOrder() {
  const orderInput = document.getElementById('order')
  order = orderInput.value
  orderText = orderInput.value
}

function updateLocation() {
  const locationInput = document.getElementById('location')
  if (locationInput.value === '%') {
    location = locationInput.value
    locationText = 'All'
  } else {
    location = '%' + locationInput.value + '%'
    locationText = locationInput.value
  }
}

function updateType() {
  const typeInput = document.getElementById('type')
  if (typeInput.value === '%') {
    type = typeInput.value
    typeText = 'Plushies'
  } else {
    type = '%' + typeInput.value + '%'
    typeText = typeInput.value + 's'
  }
}

function updateSearch() {
  const searchBar = document.getElementById('search')
  if (searchBar.value === '') {
    search = '%'
  } else if (searchBar.value !== '') {
    search = '%' + searchBar.value + '%'
  }
  searchText = searchBar.value
}