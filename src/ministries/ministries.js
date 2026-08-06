import Lottie from 'lottie-web'

const logoContainer = document.querySelector('.logo-lottie')

const lottieFiles = import.meta.glob('../assets/lottie/*.json')

getAnimation()

async function getAnimation() {
  const animationContainer = document.querySelector('html')
  const animationName = animationContainer.classList.value
  const path = `../assets/lottie/${animationName}.json`
  try {
    const logo = await lottieFiles[path]()
    showAnimation(logo.default)
  } catch (error) {
    console.error(error)
  }
}

function showAnimation(logo) {
  Lottie.loadAnimation({
    container: logoContainer,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: logo
  })
}