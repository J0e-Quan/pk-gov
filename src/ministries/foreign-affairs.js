import '../assets/styles/global.css'
import '../assets/styles/foreign-affairs.css'
import Lottie from 'lottie-web'
import foreignAffairs from '../assets/lottie/foreign-affairs.json'

const logo = document.querySelector('.ministry-of-foreign-affairs.logo-lottie')

Lottie.loadAnimation({
  container: logo,    
  renderer: 'svg',         
  loop: false,             
  autoplay: true,        
  animationData: foreignAffairs
});