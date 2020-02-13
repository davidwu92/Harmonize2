module.exports = (model, Schema) => {
  const Gig = new Schema({
    gigTitle: String,
    gigLocation: String,
    gigDate: Date,
    gigBody: String,
    gigTags: [String],
    authorName: String,
    authorUsername: String,
    authorId: String,
    authorEmail: String,
    authorPic: String,
    createdAt: { type: Date, default: Date.now },
  })
  Gig.index({gigTitle: "text", gigLocation: "text", authorName: "text", authorUsername: "text", gigTags: "text"})

  return model('Gig', Gig)
}