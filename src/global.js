import './assets/styles/global.css'

// code for opening pagefind modal for search-mobile
document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.search-icon')
  const modalElement = document.querySelector('.mobile-modal')

  if (searchIcon && modalElement) {
    searchIcon.addEventListener('click', () => {
      // This fires the exact open routine Pagefind calls internally
      if (typeof modalElement.open === 'function') {
        modalElement.open()
      } else {
        // Fallback if the component wrapper hasn't fully registered its method yet
        modalElement.setAttribute('open', '')
      }
    })
  }
})

document.addEventListener('click', (e) => {
  // Check if the clicked element (or its parent) is a link
  const anchor = e.target.closest('a')
  if (!anchor) return
  // ignore the # at the start so that getElementById works
  const hash = anchor.hash.slice(1)
  // Check if it's a local page anchor
  if (anchor.hostname === window.location.hostname && anchor.pathname === window.location.pathname) {
    const targetElement = document.getElementById(hash)
    if (targetElement) {
      // Prevent the default browser history push
      e.preventDefault()
      targetElement.scrollIntoView()
      // Remove the # after scrolling
      history.replaceState(null, null, window.location.pathname)
    }
  }
})
// clear # immediately on page load (removes # from redirects by other pages)
window.addEventListener('scrollend', () => {
  history.replaceState(null, null, window.location.pathname)
}, {once: true})

// code for handling share button
const shareButton = document.querySelector('.share')
if (shareButton !== null) {
  shareButton.addEventListener('click', share)
}

async function share() {
  const url = new URL(window.location.href)
  // remove any id tags used by table of contents before sharing
  url.hash = ''
  const title = document.querySelector('.hero-title').textContent.trim().toLocaleUpperCase()
  const excerpt = document.querySelector('.hero-excerpt').textContent.trim()
  const shareContent = {
    text: title + '\n' + excerpt + '\n\n' + 'View this page on ' + url
  } 
  const isValid = await navigator.canShare(shareContent)
  console.log(shareContent)
  console.log(isValid)
  if (isValid === true) {
    navigator.share(shareContent)
  } else if (isValid === false) {
    navigator.clipboard.writeText(shareContent.text)
    shareButton.textContent = 'Page details copied!'
  }
}