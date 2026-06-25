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

registerButton.addEventListener('click', beginRegister)
updateLocationButton.addEventListener('click', beginUpdateLocation)

function changeReturnButton() {
  const returnButton = document.querySelector('.return')
  returnButton.textContent = 'Return to dashboard'
  returnButton.href = '/pibss/manage/'
  window.addEventListener('beforeunload', (event) => {
    if (isFormDone === false) {
      event.preventDefault()
      event.returnValue = ''
    }
  })
}

function showProgressUI(formTitle, formSteps) {
  const progress = document.createElement('section')
  progress.classList.add('progress')
  const title = document.createElement('h2')
  title.classList.add('progress-title')
  title.textContent = formTitle + ': Step ' 
  const stepNumber = document.createElement('span')
  stepNumber.classList.add('progress-number')
  title.appendChild(stepNumber)
  title.append('1 of ', formSteps)
  progress.appendChild(title)
  const progressBar = document.createElement('div')
  progressBar.classList.add('progress-bar')
  progress.appendChild(progressBar)
  content.appendChild(progress)
  changeReturnButton()
}

function beginRegister() {
  content.innerHTML = ''
  // show start registering splash screen n stuff
}

function beginUpdateLocation() {
  content.innerHTML = ''
  showProgressUI('Update plushie location', '3')
  isFormDone = false
  renderPlushieSelectionForm()
}

function renderPlushieSelectionForm() {

}