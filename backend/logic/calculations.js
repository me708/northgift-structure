import { PRIZES } from './prizes.js'
import { CASES } from './cases.js'

// Рассчёт средней окупаемости кейса (в TON)
export function calculateCaseROI(caseId) {
  const gameCase = CASES.find(c => c.id === caseId)
  if (!gameCase) return null

  const prizes = PRIZES[caseId] || []
  const expectedReturn = prizes.reduce(
    (sum, prize) => sum + (prize.valueTON * (prize.chance / 100)),
    0
  )

  return {
    priceTON: gameCase.priceTON,
    expectedReturn,
    roiPercent: ((expectedReturn / gameCase.priceTON) * 100).toFixed(2),
  }
}
