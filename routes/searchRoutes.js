const { User, Youtube } = require('../models')

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
  app.get('/friendlist/:id', (req,res)=>{
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(e => console.error(e))
  })

  // GET USERS YOUTUBE LINKS 
      app.get('/youtubes/:id', (req, res) => {
        console.log(req.params.id)
        Youtube.find({ userLink: req.params.id })
          .populate('userLink')
          .then(userLink => res.json(userLink))
          .catch(e => console.error(e))
    })
}