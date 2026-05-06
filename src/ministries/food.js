import '../assets/styles/global.css'
import '../assets/styles/food.css'
import Lottie from 'lottie-web'
import logo from '../assets/lottie/food.json'

const logoContainer = document.querySelector('.ministry-of-food.logo-lottie')

Lottie.loadAnimation({
  container: logoContainer,    
  renderer: 'svg',         
  loop: false,             
  autoplay: true,        
  animationData: logo
});