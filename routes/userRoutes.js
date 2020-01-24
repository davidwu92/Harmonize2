const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = app => {
  // always use a post route for login because get routes dont have a req body

// Register route
  app.post('/users', (req, res) => {
      const { name, email, username } = req.body
      // means registering a new user then pass the password seperately
      User.register(new User({ name, email, username }), req.body.password, e => {
        if (e) {
          res.json({ success: false, message: "Your account could not be saved. Error: ", e})
        }
        res.sendStatus(200)
      })
  })

  app.get('/users', (req, res) => {
    User.find({})
        .then(users => res.json(users))
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
            res.sendStatus(404)
          }
      })
  })
}