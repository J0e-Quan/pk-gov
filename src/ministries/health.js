import '../assets/styles/global.css'
import '../assets/styles/health.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/health.json'

const logoContainer = document.querySelector('.ministry-of-health.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,
  renderer: 'svg',
  loop: false,
  autoplay: true,
  animationData: logo
})
