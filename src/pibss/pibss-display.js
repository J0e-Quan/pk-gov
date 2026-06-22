import { supabase } from "./pibss-common.js";

async function getAllEntries() {
  const { data, error } = await supabase
    .from('database')                  // 1. Target table
    .select('*')                        // 2. Fetch all columns
    .order('name', { ascending: true }) // 3. Sort alphabetically (A-Z)

  if (error) {
    return console.error('Error fetching data:', error.message)
  }

  return data
}

function removeLoader() {
  const loader = document.querySelector('.loader')
  loader.remove()
}

function renderEntries(data) {
  removeLoader()
  if (data === null) {
    return console.error('no data received!')
  }
  const container = document.querySelector('.entries')
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

renderEntries( await getAllEntries())