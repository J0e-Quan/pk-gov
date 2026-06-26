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
  const increment = 100 / 3
  const percentage = (currentStep - 0) * increment
  requestAnimationFrame(() => {
    progressBar.style.width = percentage + '%';
  });
}

function beginRegister() {
  content.innerHTML = ''
  // show start registering splash screen n stuff
}

function beginUpdateLocation() {
  content.innerHTML = ''
  showProgressUI('Update plushie location', '3')
  totalSteps = 3
  isFormDone = false
  renderPlushieSelectionForm()
}

function renderPlushieSelectionForm() {
  incrementProgress()
  const form = document.createElement('section')
  form.classList.add('form')
  const instruction = document.createElement('h3')
  instruction.classList.add('instruction')
  instruction.textContent = 'Please select an existing plushie from its name'
  form.appendChild(instruction)
  const searchWrapper = document.createElement('div')
  searchWrapper.classList.add('update-location-search-wrapper')
  const searchBar = document.createElement('input')
  searchBar.type = 'text'
  searchBar.placeholder = 'Enter plushie name here...'
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
  const searchButton = document.querySelector('update-location-search-icon')
  searchButton.addEventListener('click', searchPlushies)
}

function searchPlushies() {
  const searchBar = document.querySelector('update-location-searchbar')
  const search = searchBar.value
  // send query to supabase
}