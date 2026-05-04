const content = document.querySelector('.content')

function clearContent() {
  // this clears everything in content
  content.innerHTML = ''
}

function updateLogoText(text) {
  const logoText = document.querySelector('.logo-text.bottom')
  logoText.textContent = text
}

function updateHeaderColour(targetColour) {
  console.log(targetColour)
  const header = document.querySelector('.header')
  header.style.backgroundColor = "var("+targetColour+")"
  if (targetColour === '--ministry-of-food-colour' || targetColour === '--ministry-of-technology-colour' || targetColour === '--ministry-of-defence-colour') {
    const logoTextTop = document.querySelector('.logo-text.top') 
    const logoTextBottom = document.querySelector('.logo-text.bottom')
    logoTextTop.style.color = "rgb(0, 0, 0)"
    logoTextBottom.style.color = "rgb(0, 0, 0)"

  }
}

export function showMinistry(ministry) {
  console.log(ministry)
  clearContent()
  switch(ministry) {
    case 'central-ministry':
      updateLogoText('Central Ministry')
      updateHeaderColour('--'+ministry+'-colour')
      break
    case 'ministry-of-food':
      updateLogoText('Ministry of Food')
      updateHeaderColour('--'+ministry+'-colour')
      break
    case 'ministry-of-foreign-affairs':
      updateLogoText('Ministry of Foreign Affairs')
      updateHeaderColour('--'+ministry+'-colour')
      break
    case 'ministry-of-health':
      updateLogoText('Ministry of Health')
      updateHeaderColour('--'+ministry+'-colour')
      break
    case 'ministry-of-finance':
      updateLogoText('Ministry of Finance')
      updateHeaderColour('--'+ministry+'-colour')
      break
    case 'ministry-of-immigration':
      updateLogoText('Ministry of Immigration')
      updateHeaderColour('--'+ministry+'-colour')
      break
    case 'ministry-of-technology':
      updateLogoText('Ministry of Technology')
      updateHeaderColour('--'+ministry+'-colour')
      break
    case 'ministry-of-defence':
      updateLogoText('Ministry of Defence')
      updateHeaderColour('--'+ministry+'-colour')
      break
  }
  const testtext = document.createElement('p')
  testtext.textContent = 'This is the '+ministry+' section!'
  content.appendChild(testtext)
}

export function showInfoPage() {
  console.log('showing info page')
  clearContent()
}

export function showNewsPage() {
  console.log('showing news page')
  clearContent()
}