// @ts-check
import express from 'express'

const app = express()

const PORT = 5000

app.use('/', (req, res, next) => {
  res.send('Hello, express!')

  setTimeout(() => {
    next()
  }, 1000)
})

app.use((req, res) => {
  console.log('middleware 2')
  res.send('express 2')
})

app.listen(PORT, () => {
  console.log(`express sever is listening at port: ${PORT}`)
})
