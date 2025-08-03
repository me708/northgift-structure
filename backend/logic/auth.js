export function initTelegramAuth() {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready()
    return window.Telegram.WebApp.initDataUnsafe?.user || null
  }
  return null
}
