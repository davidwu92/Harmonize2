const { Gig } = require('../models')

module.exports = app => {
  app.post('/gigs', (req, res) => {
    const {gigTitle,gigLocation,gigDate,gigBody,gigTags,gigAuthorName,gigAuthorId,gigAuthorEmail,gigAuthorPic,} = req.body
    Gig.create({
      gigTitle,gigLocation,gigDate,gigBody,gigTags,gigAuthorName,gigAuthorId,gigAuthorEmail,gigAuthorPic
    })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  app.get('/gigs', (req, res) => {
    Gig.find({})
    .then(gigs => res.json(gigs))
    .catch(e => console.error(e))
  })
}
