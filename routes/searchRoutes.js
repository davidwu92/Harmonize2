const { User } = require('../models')

module.exports = app => {

  // SEARCH ALL USERS
  app.get('/search/:query', (req, res) => {
    User.find({$text: {$search: req.params.query}})
        .then(users => res.json(users))
        .catch(e => console.error(e))
  })

  // GET ONE USER (visit profile)
  app.get('/visit/:id', (req,res)=>{
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(e => console.error(e))
  })
}