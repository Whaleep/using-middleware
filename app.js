const express = require('express')
const app = express()
const port = 3000

function toLocalTime(date) {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z$/, '')
}

app.use((req, res, next) => {
  const timeStart = new Date()
  console.log(`${toLocalTime(timeStart)} | ${req.method} from ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
