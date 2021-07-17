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
  // try hrtime
  const hrtimeStart = process.hrtime()
  // try new Date
  const timeStart = new Date()
  // console.log(`${toLocalTime(timeStart)} | ${req.method} from ${req.url}`)

  res.on('finish', () => {
    // try hrtime
    const hrtimeEnd = process.hrtime(hrtimeStart)
    const totalHrtime = hrtimeEnd[0] * 1e9 + hrtimeEnd[1]
    console.log(`${toLocalTime(timeStart)} | ${req.method} from ${req.url} | total time: ${totalHrtime}ns`)
    // try new Date
    const timeEnd = new Date()
    console.log(`${toLocalTime(timeStart)} | ${req.method} from ${req.url} | total time: ${timeEnd - timeStart}ms`)
  })

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
