// @ts-check
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

app.use(express.static('src/public'))
app.set('views', 'src/views')
app.set('view engine', 'pug')

const userRoute = express.Router()

const PORT = 5000

userRoute.get('/', (req, res) => {
  res.send('User list')
})

const USERS = {
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'bar',
  },
}

userRoute.param('id', (req, res, next, value) => {
  console.log(value)
  // @ts-ignore
  req.user = USERS[value]
  next()
})

userRoute.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
    })
  }
})

userRoute.post('/', (req, res) => {
  res.send('User registered.')
})

userRoute.post('/:id/nickname', (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRoute)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`express sever is listening at port: ${PORT}`)
})
