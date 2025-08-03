const express = require('express');
import path from 'path'
import { fileURLToPath } from 'url'
import { getCasePrize } from './logic/prizes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

app.use(express.json())

// Отдача фронтенда
app.use('/', express.static(path.join(__dirname, '../frontend')))

// API открытия кейса
app.post('/api/cases/open', async (req, res) => {
  const { userId, caseType } = req.body

  try {
    const prize = await getCasePrize(userId, caseType)
    res.json({ success: true, prize })
  } catch (err) {
    res.json({ success: false, error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`🌍 Сервер запущен на http://localhost:${PORT}`)
})
