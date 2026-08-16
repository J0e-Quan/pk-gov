import './assets/styles/global.css'

const THREE_SECONDS = 3000

// code for opening pagefind modal for search-mobile
document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.search-icon')
  const modalElement = document.querySelector('.mobile-modal')

  if (searchIcon && modalElement) {
    searchIcon.addEventListener('click', () => {
      // This fires the exact open routine Pagefind calls internally
      if (typeof modalElement.open === 'function') {
        modalElement.open()
      } else {
        // Fallback if the component wrapper hasn't fully registered its method yet
        modalElement.setAttribute('open', '')
      }
    })
  }
})

document.addEventListener('click', (e) => {
  // Check if the clicked element (or its parent) is a link
  const anchor = e.target.closest('a')
  if (!anchor) return
  // ignore the # at the start so that getElementById works
  const hash = anchor.hash.slice(1)
  // Check if it's a local page anchor
  if (anchor.hostname === window.location.hostname && anchor.pathname === window.location.pathname) {
    const targetElement = document.getElementById(hash)
    if (targetElement) {
      // Prevent the default browser history push
      e.preventDefault()
      targetElement.scrollIntoView()
      // Remove the # after scrolling
      history.replaceState(null, null, window.location.pathname)
    }
  }
})
// clear # immediately on page load (removes # from redirects by other pages)
window.addEventListener('scrollend', () => {
  history.replaceState(null, null, window.location.pathname)
}, {once: true})

// code for handling share button
const shareButton = document.querySelector('.share')
if (shareButton !== null) {
  shareButton.addEventListener('click', share)
}

async function share() {
  const url = new URL(window.location.href)
  // remove any id tags used by table of contents before sharing
  url.hash = ''
  const title = document.querySelector('.hero-title').textContent.trim().toLocaleUpperCase()
  const excerpt = document.querySelector('.hero-excerpt').textContent.trim()
  const shareContent = {
    text: title + '\n' + excerpt + '\n\n' + 'View this page on ' + url
  } 
  const isValid = await navigator.canShare(shareContent)
  if (isValid === true) {
    navigator.share(shareContent)
  } else if (isValid === false) {
    navigator.clipboard.writeText(shareContent.text)
    shareButton.textContent = 'Page details copied!'
  }
}

// code for handling print button
const printButton = document.querySelector('.print')
if (printButton !== null) {
  printButton.addEventListener('click', () => {
    window.print()
  })
}

// code for opening/closing notification-modal
const notificationsButton = document.querySelector('.notifications-button')
if (notificationsButton !== null) {
  notificationsButton.addEventListener('click', showNotificationsModal)
}

const closeButton = document.querySelector('.button.close')
if (closeButton !== null) {
  closeButton.addEventListener('click', closeNotificationsModal)
}

function showNotificationsModal() {
  const notificationsModal = document.querySelector('.notifications-modal')
  notificationsModal.showModal()
}

function closeNotificationsModal() {
  const notificationsModal = document.querySelector('.notifications-modal')
  notificationsModal.close()
}

// code for getting rss feed url
const rssButton = document.querySelector('.button.rss')
if (rssButton !== null) {
  rssButton.addEventListener('click', getRSS)
}

function getRSS() {
  const feedURL = window.location.origin + '/feed.xml'
  const rssButton = document.querySelector('.button.rss')
  navigator.clipboard.writeText(feedURL).then(() => {
    rssButton.textContent = 'URL copied!'
    setTimeout(() => {
      rssButton.textContent = 'Copy RSS Feed URL'
    }, THREE_SECONDS)
  })
}

// code for handling push notifications
// eslint-disable-next-line no-undef
window.OneSignalDeferred = window.OneSignalDeferred || [];
// eslint-disable-next-line no-undef
OneSignalDeferred.push(async function (OneSignal) { 
  const pushButton = document.querySelector('.button.push')
  const notificationTitle = document.querySelector('.notifications-title')
  if (pushButton !== null) {
    if (OneSignal.User.PushSubscription.optedIn === true) {
      pushButton.textContent = 'Opt out of notifications'
      notificationTitle.textContent = "You've opted in to receiving push notifications for new articles."
      pushButton.addEventListener('click', optOut, {once: true})
    } else {
      pushButton.addEventListener('click', optIn, {once: true})
    }
  }

  function optOut() {
    OneSignal.User.PushSubscription.optOut()
    pushButton.textContent = 'Successfully opted out!'
    notificationTitle.textContent = "Get notified whenever a new article is posted here. Click the 'Manage preferences' button to enable push notifications."
    setTimeout(() => {
      pushButton.textContent = 'Enable notifications'
      pushButton.addEventListener('click', optIn, {once: true})
    }, THREE_SECONDS);
  }

  async function optIn() {
    await OneSignal.Notifications.requestPermission();
    if (OneSignal.Notifications.permission) {
      OneSignal.User.PushSubscription.optIn();
    } else {
      alert("Notification permission blocked! Please enable notification permissions for this website.")
    }
    pushButton.textContent = "Notifications enabled!"
    notificationTitle.textContent = "You've opted in to receiving push notifications for new articles."
    setTimeout(() => {
      pushButton.textContent = 'Opt out of notifications'
      pushButton.addEventListener('click', optOut, {once: true})
    }, THREE_SECONDS);
  }
})