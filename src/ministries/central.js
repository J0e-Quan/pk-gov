import '../assets/styles/global.css'
import '../assets/styles/central.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/central.json'

const logoContainer = document.querySelector('.central-ministry.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,
  renderer: 'svg',
  loop: false,
  autoplay: true,
  animationData: logo
})
