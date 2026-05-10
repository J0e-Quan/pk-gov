import '../assets/styles/global.css'
import '../assets/styles/defence.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/defence.json'

const logoContainer = document.querySelector('.ministry-of-defence.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,
  renderer: 'svg',
  loop: false,
  autoplay: true,
  animationData: logo
})
