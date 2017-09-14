const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const async = require('asyncawait/async')
const allCredentials = [{email: 'test@test.com', password: 1234}]

const fetchUser = (() => {
  const user = {id: 'test-1234', email: 'test@test.com', userName: 'Test User'}
  return async(() => {
    return user
  })
})()

// try to authenticate user with email and password
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
