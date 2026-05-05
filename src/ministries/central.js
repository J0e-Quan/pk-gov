import '../assets/styles/global.css'
import '../assets/styles/central.css'
import Lottie from 'lottie-web'
import central from '../assets/lottie/central.json'
import pbb from'../assets/pictures/ministers/pbb.webp'

const centralContainer = document.querySelector('.central-ministry.logo-lottie')

Lottie.loadAnimation({
  container: centralContainer,    
  renderer: 'svg',         
  loop: false,             
  autoplay: true,        
  animationData: central
});