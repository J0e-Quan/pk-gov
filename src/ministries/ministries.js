import Lottie from 'lottie-web'

const logoContainer = document.querySelector('.logo-lottie')

getAnimation()

async function getAnimation() {
  const animationContainer = document.querySelector('html')
  const animationName = animationContainer.classList.value
  try {
    const logo = await import('../assets/lottie/' + animationName + '.json')
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