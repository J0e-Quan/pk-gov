import { supabase } from "./pibss-common.js";

// check if user is authenticated immediately
checkUserAuthentication()

async function checkUserAuthentication() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    // No active session found, user is redirected the login page immediately
    window.location.href = '/pibss/login/'
  } else {
    // User is authorized
  }
}

const registerButton = document.querySelector('.register-button')
const updateLocationButton = document.querySelector('.update-location-button')
const content = document.querySelector('.content')
// initially, form is done because there is no form to begin with
let isFormDone = true
let currentStep = 0
let totalSteps

registerButton.addEventListener('click', beginRegister)
updateLocationButton.addEventListener('click', beginUpdateLocation)

function changeReturnButton() {
  const returnButton = document.querySelector('.return')
  returnButton.textContent = 'Return to dashboard'
  returnButton.href = '/pibss/manage/'
  // ENABLE THIS WHEN FORM IS DONE!!!!!!
  // window.addEventListener('beforeunload', (event) => {
  //   if (isFormDone === false) {
  //     event.preventDefault()
  //     event.returnValue = ''
  //   }
  // })
}

function showProgressUI(formTitle, formSteps) {
  const progress = document.createElement('section')
  progress.classList.add('progress')
  const title = document.createElement('h2')
  title.classList.add('progress-title')
  title.textContent = formTitle + ': Step ' 
  const stepNumber = document.createElement('span')
  stepNumber.classList.add('progress-number')
  stepNumber.textContent = 0
  title.appendChild(stepNumber)
  title.append(' of ', formSteps)
  progress.appendChild(title)
  const progressBarWrapper = document.createElement('div')
  progressBarWrapper.classList.add('progress-bar-wrapper')
  const progressBar = document.createElement('div')
  progressBar.classList.add('progress-bar')
  progressBarWrapper.appendChild(progressBar)
  progress.appendChild(progressBarWrapper)
  content.appendChild(progress)
  changeReturnButton()
}

function incrementProgress() {
  currentStep++
  const stepNumber = document.querySelector('.progress-number')
  stepNumber.textContent = currentStep
  const progressBar = document.querySelector('.progress-bar')
  const increment = 100 / totalSteps
  const percentage = (currentStep - 0) * increment
  requestAnimationFrame(() => {
    progressBar.style.width = percentage + '%';
  });
}

function clearForm() {
  const form = document.querySelector('.form')
  form.innerHTML = ''
}

function beginRegister() {
  content.innerHTML = ''
  // show start registering splash screen n stuff
}

function beginUpdateLocation() {
  content.innerHTML = ''
  totalSteps = 3
  showProgressUI('Update plushie location', totalSteps)
  isFormDone = false
  renderPlushieSelectionForm()
}

function renderPlushieSelectionForm() {
  incrementProgress()
  const form = document.createElement('section')
  form.classList.add('form')
  const instruction = document.createElement('h3')
  instruction.classList.add('instruction')
  instruction.textContent = "Please search for an existing plushie's name"
  form.appendChild(instruction)
  const searchWrapper = document.createElement('div')
  searchWrapper.classList.add('update-location-search-wrapper')
  const searchBar = document.createElement('input')
  searchBar.type = 'text'
  searchBar.placeholder = 'Enter a name here...'
  searchBar.classList.add('update-location-searchbar')
  searchBar.id = 'search'
  searchWrapper.appendChild(searchBar)
  const searchButton = document.createElement('button')
  searchButton.classList.add('update-location-search-button', 'button')
  searchButton.textContent = 'Search'
  searchWrapper.appendChild(searchButton)
  form.appendChild(searchWrapper)
  content.appendChild(form)
  initPlushieSearch()
}

function initPlushieSearch() {
  const searchButton = document.querySelector('.update-location-search-button')
  searchButton.addEventListener('click', searchPlushies)
}

async function searchPlushies() {
  const searchBar = document.querySelector('.update-location-searchbar')
  if (searchBar.value !== '') {
    const search = '%' + searchBar.value + '%'
    const { data, error } = await supabase
      .from('database')
      .select('*')
      .ilike('name', search)

    if (error) {
      console.error(error)
    }

    renderSearchResults(data)
  } else {
    alert("Please enter a plushie's name!")
  }
}

function renderSearchResults(data) {
  clearForm()
  incrementProgress()
  if (data === null) {
    return console.error('no data received!')
  }
  const form = document.querySelector('.form')
  const instruction = document.createElement('h3')
  instruction.classList.add('instruction')
  instruction.textContent = 'Please select the correct search result'
  form.appendChild(instruction)
  const container = document.createElement('div')
  container.classList.add('entries')
  if (data.length === 0) {
    const emptyMessage = document.createElement('h3')
    emptyMessage.classList.add('pibss-empty-message')
    emptyMessage.textContent = "We couldn't find any plushies matching your filtering options."
    container.appendChild(emptyMessage)
    return 
  }
  for (const entry of data) {
    const card = document.createElement('button')
    card.type = 'button'
    card.id = entry.name + '|' + entry.location
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
    card.addEventListener('click', selectPlushie)
    container.appendChild(card) 
  }
  form.appendChild(container)
}

function selectPlushie(e) {
  // currentTarget gets the element which has the eventListener instead of whatever was clicked
  const selectedPlushie = e.currentTarget
  console.log(selectedPlushie)
  renderUpdateLocationPage(selectedPlushie)
}

function renderUpdateLocationPage(selectedPlushie) {
  clearForm()
  incrementProgress()
}