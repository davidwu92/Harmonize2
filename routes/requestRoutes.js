const { User, FriendRequest }  = require('../models')

// 1 = request 2= accepted 3=rejected
module.exports = app => {

// make friend request
  app.post('/request', (req, res) => {
let { requester, recipient, status } = req.body
let { requester: userRequest} = req.body
      FriendRequest.create({requester, recipient, status, userRequest}) 
        .then(link => {
                 res.json(link)
               User.updateOne({ _id: link.recipient }, { $push: { requests: link.requester }})
              .then(() => {
                User.update({_id: link.requester}, {$push: { pending: link.recipient}})
               .then(() => {
                  console.log('hi')
                   })
               .catch(e => console.error(e))
              } )
              .catch(e => console.error(e))
              })
  
                .catch(e => console.error(e))

          // User.update({_id: request.recipient}, {$push: { requests: request}})
          // .then(() => res.sendStatus(200))
          // .catch(e => console.error(e))
  })
// app.put('/accept/:id', (req, res) => {

// })

// request or reject friend request if accpeted then user gets friend list 

app.put('/request/:id', (req, res) => {
  
  FriendRequest.findOneAndUpdate({ _id: req.params.id}, {$set: { status: req.body.status }})
    .then(request => {
      console.log(request.status)
      if (request.status === 1 || 2) {
        console.log('one')
        // Requester receives friend
        User.updateOne({ _id: request.requester}, {$addToSet: { friends: request.recipient}})
          .then(() => {
            // Recipient loses request
            console.log('two')
            User.updateOne({_id: request.recipient}, {$pull: {requests: request.requester}})
              .then(() => {
                // Requester loses pending
                console.log('three')
                User.updateOne({_id: request.requester}, {$pull: {pending: request.recipient}})
                  .then(() => {
                    // Recipient receives friend
                    console.log('four')
                    User.updateOne({_id: request.recipient}, {$addToSet: {friends: request.requester}})
                      .then(() => res.sendStatus(200))
                       .catch(e => console.error(e))
                  })
              })
          })
          // takes request off both people/ignored!
      } else if (request.status === 3) {
        console.log(request.status)
        User.updateOne({ _id: request.recipient}, {$pull: { requests: request.requester}})
          .then(() => { User.updateOne({_id: request.requester}, {$pull: { pending: request.recipient}})
              .then(() => res.sendStatus(200))
          })
          .catch(e => console.error(e))
      } else {
        res.sendStatus(200)
      }
    })
    .catch(e => console.error(e))
})

// unfollow friend

app.put('/friends/:id', (req, res) => {
  User.updateOne({ _id: req.params.id}, {$pull:{friends: req.body.friendId  }})
    .then(() => {
      User.updateOne({ _id: req.body.friendId}, {$pull: {friends: req.params.id}})
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
    })
    .catch(e => console.error(e))
})


// see all friends
app.get('/friends/:id', (req, res) => {
    User.findById(req.params.id)
    .then(data => {
      // where all friends populate 
      User.find({_id: {$in: data.friends }})
      .then(user => res.json(user))
      .catch(e => console.error(e))  
    })
    .catch(e => console.error(e))
})

// see all requests
app.get('/request/:id', (req, res) => {
  // FriendRequest.find({})
    FriendRequest.find({ recipient: req.params.id})
    .populate('userRequest')
      .then(data => {
        // console.log(data)
        User.find({_id: data._id})
        .then(() =>{
          console.log(data)
          res.json(data)
        } )
        .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
}) 

}