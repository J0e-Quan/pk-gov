import '../assets/styles/global.css'
import '../assets/styles/technology.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/technology.json'

const logoContainer = document.querySelector('.ministry-of-technology.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,
  renderer: 'svg',
  loop: false,
  autoplay: true,
  animationData: logo
})
