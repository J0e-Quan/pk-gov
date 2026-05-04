import { showMinistry } from "./display.js"

const ministries = document.querySelector('.ministries')

export function initMinistries() {
  ministries.addEventListener('click', selectMinistry)
}

function selectMinistry(ministry) {
  if (ministry.target.classList.length > 0) {
    showMinistry(ministry.target.classList.value)
  }
}
