let currentUser = null

export function initTelegramAuth() {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready()
    currentUser = window.Telegram.WebApp.initDataUnsafe?.user || null
  }
  return currentUser
}

export function getCurrentUser() {
  return currentUser
}
