const { Gig } = require('../models')

module.exports = app => {

  //get all gigs
  app.get('/gigs', (req, res) => {
    const {
      // variables
    } = req.body
    Gig.find({})
      .then(()=>{})
      .catch(e=>console.error)
  })

  app.post('/gigs', (req, res) => {
    Gig.create({})
      .then(()=>{res.sendStatus(200)})
      .catch(e=>console.error(e))
  })

}