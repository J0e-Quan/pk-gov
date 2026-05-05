import '../assets/styles/global.css'
import '../assets/styles/central.css'
import Lottie from 'lottie-web'
import cm from '../assets/lottie/cm.json'

const cmContainer = document.querySelector('.central-ministry.logo-lottie')

Lottie.loadAnimation({
  container: cmContainer,    
  renderer: 'svg',         
  loop: false,             
  autoplay: true,        
  animationData: cm 
});