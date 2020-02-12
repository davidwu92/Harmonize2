module.exports = (model, Schema) => {
  const Gig = new Schema({
      gigTitle: String,
      gigLocation: String,
      gigBody: String,
      link: String,
      authorName: String,
      authorId: String,
      authorEmail: String,
      authorPic: String,
      createdAt: { type: Date, default: Date.now },
  })

  return model('Youtube', Gig)
}