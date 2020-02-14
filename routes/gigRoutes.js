const { Gig } = require('../models')

module.exports = app => {
  // POST A GIG
  app.post('/gigs', (req, res) => {
    const {gigTitle,gigLocation,gigDate,gigBody,gigTags,authorName,authorUsername,authorId,authorEmail,authorPic,} = req.body
    Gig.create({
      gigTitle,gigLocation,gigDate,gigBody,gigTags,authorName,authorUsername,authorId,authorEmail,authorPic
    })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  // GET ALL GIGS
  app.get('/gigs', (req, res) => {
    Gig.find({})
    .then(data => res.json(data))
    .catch(e => console.error(e))
  })

  // GET FILTERED GIGS
  app.get('/gigs/:query', (req, res) => {
    Gig.find({$text: {$search: req.params.query}})
        .then(data => res.json(data))
        .catch(e => console.error(e))
  })

  // DELETE GIG
  app.delete('/gigs/:id', (req, res)=>{
    const {id:_id}=req.params
    console.log(_id)
    Gig.findByIdAndRemove(_id)
      .then(()=>res.sendStatus(200))
      .catch(e=>console.error(e))
  })

  // UPDATE GIG
  app.put('/gigs/:id', (req, res) => {
    Gig.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })
}
