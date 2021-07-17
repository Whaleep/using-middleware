const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const { conutByDate, conutByHrtime } = require('./tools/general')
app.use(conutByHrtime)
app.use(conutByDate)

app.use(routes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
