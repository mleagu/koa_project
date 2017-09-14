const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const async = require('asyncawait/async')
const wait = require('asyncawait/await')
const allCredentials = [{email: 'test@test.com', password: 1234}]

const fetchUser = (() => {
  const user = {id: 'test-1234', email: 'test@test.com', userName: 'Test User'}
  return async(() => {
    return user
  })
})()

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async((id, done) => {
  try {
    const user = wait(fetchUser())
    done(null, user)
  } catch (err) {
    done(err)
  }
}))

passport.use(new LocalStrategy({usernameField: 'email',
  passwordField: 'password'}, (email, password, done) => {
    fetchUser()
      .then(user => {
        let userCredentials = allCredentials.find(() => {
          return email === user.email
        })
        if (userCredentials && email === userCredentials.email &&
            parseInt(password, 10) === userCredentials.password) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
      .catch(err => done(err))
  }))