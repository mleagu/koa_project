const errorMessage = { errorCode: 'AuthLogin',
  errorMessage: 'Your user name and/or password mismatch',
  errorUuid: 'a8fd4779-d05d-442b-a136-7ab65d136102'
}
const Koa = require('koa')
const router = require('koa-route')
const app = new Koa()
app.proxy = true

// body parser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

require('./auth')
const passport = require('koa-passport')

app.use(passport.initialize())
app.use(passport.session())

app.use(router.post('/api/v1/login', (req) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.throw(500)
    }
    if (user === false) {
      req.body = '=> Status 401 \n'.concat(JSON.stringify(errorMessage))
      // req.throw(401)
    } else {
      req.body = '=> Status 200 \n'.concat(JSON.stringify(user))
    }
    return req.body
  })(req)
}))

app.listen(8000, function () {
  console.log('Server running ...')
})
