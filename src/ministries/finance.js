import '../assets/styles/global.css'
import '../assets/styles/finance.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/finance.json'

const logoContainer = document.querySelector('.ministry-of-finance.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,    
  renderer: 'svg',         
  loop: false,             
  autoplay: true,        
  animationData: logo
});