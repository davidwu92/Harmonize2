const { Youtube, User } = require('../models')
const passport = require('passport')

module.exports = app => {
    // GET LINKS
    app.get('/youtubes', passport.authenticate('jwt', { session: false }), (req, res) => {
       const { _id } = req.user
        Youtube.find({ userLink: _id })
          .populate('userLink')
          .then(userLink => res.json(userLink))
          .catch(e => console.error(e))
    })
    // POST LINK
    app.post('/youtubes', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { _id: userLink } = req.user
        const { link } = req.body
      
        Youtube.create({ link, userLink })
            .then(youtube => {
              User.updateOne({ _id: userLink }, { $push: { links: youtube } })
              .then(() => res.sendStatus(200))
              .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
    })


      app.delete('/youtubes', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { _id: userLink } = req.user
        const { _id: id } = req.body

          Youtube.deleteOne({ _id: id, userLink })
            .then(youtube => {
              User.updateOne({ _id: userLink }, { $pull: { links: id._id } })
               .then(() => res.sendStatus(200))
               .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
      })

}
