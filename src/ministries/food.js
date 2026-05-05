import '../assets/styles/global.css'
import '../assets/styles/food.css'
import Lottie from 'lottie-web'
import food from '../assets/lottie/food.json'

const foodContainer = document.querySelector('.ministry-of-food.logo-lottie')

Lottie.loadAnimation({
  container: foodContainer,    
  renderer: 'svg',         
  loop: false,             
  autoplay: true,        
  animationData: food
});