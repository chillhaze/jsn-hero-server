const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const heroesRouter = require('./routes/api/heroes')

require('dotenv').config()

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// Routes
app.use('/api/heroes', heroesRouter)

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

module.exports = app