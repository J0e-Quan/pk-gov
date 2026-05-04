import { showInfoPage, showMinistry, showNewsPage } from "./display.js"

const ministries = document.querySelector('.ministries')
const information = document.querySelector('.info-and-news')
initHomeButtons()

export function initHomeButtons() {
  // {once: true} deletes the eventlistener once fired, no need to removeEventListener separately
  ministries.addEventListener('click', selectMinistry, {once: true})
  information.addEventListener('click', selectPage, {once: true})
}

function selectMinistry(ministry) {
  if (ministry.target.classList.length > 0) {
    showMinistry(ministry.target.classList.value)
  }
}

function selectPage(page) {
  if (page.target.classList.contains('pk-info', 'cta')) {
    showInfoPage()
  } else if (page.target.classList.contains('news', 'cta')) {
    showNewsPage()
  }
}
