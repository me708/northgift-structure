import express from 'express'
import cors from 'cors'
import { CASES, getCasePrize } from './logic/cases.js'

const app = express()
app.use(cors())
app.use(express.json())

// Простейшее хранилище для логов (in-memory)
const prizeLogs = []

// Получить список кейсов
app.get('/api/cases', (req, res) => {
  res.json(CASES)
})

// Открыть кейс
app.post('/api/open-case', async (req, res) => {
  const { userId, caseType } = req.body
  if (!userId || !caseType) return res.status(400).json({ error: 'Missing parameters' })

  const prize = await getCasePrize(userId, caseType)

  // Логируем в память
  prizeLogs.push({
    userId,
    caseType,
    prize,
    timestamp: new Date().toISOString()
  })

  res.json({ prize })
})

// Получить историю (для проверки)
app.get('/api/prize-logs', (req, res) => {
  res.json(prizeLogs)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
