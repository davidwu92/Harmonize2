module.exports = (model, Schema) => {

  const FriendRequest = new Schema({
    requester: { type: String},
    recipient: { type: String},
    status: { type: Number},
    userRequest: { type: Schema.Types.ObjectId, ref: 'User'}

  })

  return model('FriendRequest', FriendRequest)
}