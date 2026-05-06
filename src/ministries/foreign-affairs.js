import '../assets/styles/global.css'
import '../assets/styles/foreign-affairs.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/foreign-affairs.json'

const logoContainer = document.querySelector('.ministry-of-foreign-affairs.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,    
  renderer: 'svg',         
  loop: false,             
  autoplay: true,        
  animationData: logo
});