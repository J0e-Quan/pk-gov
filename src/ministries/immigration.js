import '../assets/styles/global.css'
import '../assets/styles/immigration.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/immigration.json'

const logoContainer = document.querySelector('.ministry-of-immigration.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,
  renderer: 'svg',
  loop: false,
  autoplay: true,
  animationData: logo
})
