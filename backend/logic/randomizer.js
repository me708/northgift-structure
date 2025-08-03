export function getRandomPrize(prizeList, userId = null) {
  const totalChance = prizeList.reduce((sum, p) => sum + p.chance, 0)
  const rand = Math.random() * totalChance
  let sum = 0

  for (const prize of prizeList) {
    sum += prize.chance
    if (rand <= sum) return prize
  }
  return null
}
