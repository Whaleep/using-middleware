const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('general', { send: '列出全部 Todo' })
})

router.get('/new', (req, res) => {
  res.render('general', { send: '新增 Todo 頁面' })
})

router.get('/:id', (req, res) => {
  res.render('general', { send: '顯示一筆 Todo' })
})

router.post('/', (req, res) => {
  res.render('general', { send: '新增一筆  Todo' })
})

module.exports = router
