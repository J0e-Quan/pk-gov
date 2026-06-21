import '../assets/styles/global.css'
import '../assets/styles/content-page.css'

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