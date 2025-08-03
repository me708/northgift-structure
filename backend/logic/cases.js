import { PRIZES } from './prizes.js'
import { getRandomPrize } from './randomizer.js'

export const CASES = [
  {
    id: 'standard',
    name: 'Стандартный кейс',
    priceTON: 10,
    priceStars: 100,
  },
  {
    id: 'premium',
    name: 'Премиум кейс',
    priceTON: 20,
    priceStars: 200,
  },
]

// Временное in-memory логирование (сервер должен импортировать и обновлять)
export const prizeLogs = []

export async function getCasePrize(userId, caseType) {
  const prizeList = PRIZES[caseType] || []
  const prize = getRandomPrize(prizeList, userId)

  // Можно сюда добавить запись в prizeLogs, если нужна централизованная логика
  prizeLogs.push({
    userId,
    caseType,
    prize,
    timestamp: new Date().toISOString(),
  })

  return prize
}
