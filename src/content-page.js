import './assets/styles/global.css'
import './assets/styles/content-page.css'

// code for opening pagefind modal for search-mobile
document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.search-icon');
  const modalElement = document.querySelector('.mobile-modal');

  if (searchIcon && modalElement) {
    searchIcon.addEventListener('click', () => {
      // This fires the exact open routine Pagefind calls internally
      if (typeof modalElement.open === 'function') {
        modalElement.open();
      } else {
        // Fallback if the component wrapper hasn't fully registered its method yet
        modalElement.setAttribute('open', '');
      }
    });
  }
});

// code for handling share button
const shareButton = document.querySelector('.share')
shareButton.addEventListener('click', share)

async function share() {
  const shareContent = {
    url: window.location.href 
  } 
  const isValid = await navigator.canShare(shareContent)
  console.log(shareContent)
  console.log(isValid)
  if (isValid === true) {
    navigator.share(shareContent)
  } else if (isValid === false) {
    navigator.clipboard.writeText(shareContent)
  }
}