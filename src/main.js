// @ts-check
import express from 'express'

const app = express()

const PORT = 5000

app.use('/', (req, ress) => {
  ress.send('Hello, express!')
})

app.listen(PORT, () => {
  console.log(`express sever is listening at port: ${PORT}`)
})
