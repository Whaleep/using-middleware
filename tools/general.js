
// "2021-07-17T19:10:20.123Z" -> "2021-07-18 03:10:20" (GMT+0800)
function toLocalTime(date) {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z$/, '')
}

const fs = require('fs')
const HTTPLOGS = './logs/httpLogs.log'

function conutByDate(req, res, next) {
  const timeStart = new Date()
  res.on('finish', () => {
    const timeEnd = new Date()
    const totaltime = timeEnd - timeStart
    const log = `${toLocalTime(timeStart)} | ${req.method} from ${req.url} | total time: ${totaltime}ms`
    console.log(log)
    fs.appendFile(HTTPLOGS, log +'\n', (error) => {
      if (error) console.log(error)
    })
  })
  next()
}

function conutByHrtime(req, res, next) {
  const timeStart = process.hrtime()

  res.on('finish', () => {
    const timeEnd = process.hrtime(timeStart)
    const totaltime = timeEnd[0] * 1e9 + timeEnd[1]
    const log = `${toLocalTime(new Date())} | ${req.method} from ${req.url} | total time: ${totaltime}ns`
    console.log(log)
    fs.appendFile(HTTPLOGS, log + '\n', (error) => {
      if (error) console.log(error)
    })
  })
  next()
}

module.exports = { conutByDate, conutByHrtime }
