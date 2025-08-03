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

// Функция получения приза при открытии кейса
export async function getCasePrize(userId, caseType) {
  const prizeList = PRIZES[caseType] || []
  const prize = getRandomPrize(prizeList, userId)

  // TODO: Запись в базу и учёт статистики можно тут добавить

  return prize
}
