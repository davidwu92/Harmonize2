const { Gig } = require('../models')

module.exports = app => {
  app.post('/gigs', (req, res) => {
    const {gigTitle,gigLocation,gigDate,gigBody,gigTags,authorName,authorUsername,authorId,authorEmail,authorPic,} = req.body
    Gig.create({
      gigTitle,gigLocation,gigDate,gigBody,gigTags,authorName,authorUsername,authorId,authorEmail,authorPic
    })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  app.get('/gigs', (req, res) => {
    Gig.find({})
    .then(gigs => res.json(gigs))
    .catch(e => console.error(e))
  })

  app.get('/gigs/:query', (req, res) => {
    Gig.find({$text: {$search: req.params.query}})
        .then(gigs => res.json(gigs))
        .catch(e => console.error(e))
  })
}
