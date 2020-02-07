const { User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')
module.exports = app => {
  // always use a post route for login because get routes dont have a req body

  // Register new user
  app.post('/users', (req, res) => {
      const { name, email, username, links, bio, pfPic, instruments, skills, profile, resetPasswordToken, resetPasswordExpires } = req.body
      // means registering a new user then pass the password seperately
      User.register(new User({ name, email, username, links, bio, pfPic, instruments, skills, profile, resetPasswordToken, resetPasswordExpires }), req.body.password, e => {
        if (e) {
          res.json({ success: false, message: "Your account could not be saved. Error: ", e})
        }
        res.sendStatus(200)
      })
  })

  // GET MY PROFILE INFO (when logged in)
  app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user)
    const { _id } = req.user
    User.findById(_id)
      .then(user => res.json(user))
      .catch(e => console.error(e))
  })

  // EDIT MY PROFILE INFO (when logged in)
  app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  // Login route
  app.post('/login', (req, res) => {
    User.authenticate()(req.body.username, req.body.password, (e, user) => {
      if (e) {
        console.log(e)
      }
      if (user) {
        res.json({
          token: jwt.sign({ id: user._id }, process.env.SECRET)
        })
      } else {
        res.sendStatus(200)
      }
    })
  })
}