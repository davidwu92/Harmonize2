require('dotenv').config()
const express = require('express')
const { join } = require('path')
// passport modules
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt }  = require('passport-jwt')

const app = express()
const { User } = require('./models')
 
//middlewares
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

//DEPLOYING TO HEROKU
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// passport middleware
// start the passport engine
app.use(passport.initialize())
// brand new session
app.use(passport.session())

// need to use "new" since strategy is a constructor we need new 
passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// grabbing the token authentication process
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
.then(user => cb(null, user))
.catch(e => cb(e))))
 
require("./routes")(app)

require('mongoose')
  .connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/harmonizedb', {
  // these methods are rarely used
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
  .then(()=>app.listen(process.env.PORT || 3001))
  .catch(e=>console.error(e))