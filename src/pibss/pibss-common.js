import '../assets/styles/global.css'
import '../assets/styles/content-page.css'
import '../assets/styles/pibss.css'
import { createClient } from '@supabase/supabase-js'

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

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://nsqlmhmrtprfrykovvqg.supabase.co', 'sb_publishable_4hpz79Ywi9UaYSfk_KxQ1g_Z8XDr4Lg')