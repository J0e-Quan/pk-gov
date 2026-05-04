const content = document.querySelector('.content')

function clearContent() {
  // this clears everything in content
  content.innerHTML = ''
}

export function showMinistry(ministry) {
  console.log(ministry)
  clearContent()
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