module.exports = (model, Schema) => {
  const Gig = new Schema({
    gigTitle: String,
    gigLocation: String,
    gigDate: Date,
    gigBody: String,
    gigTags: [String],
    gigAuthorName: String,
    gigAuthorId: String,
    gigAuthorEmail: String,
    gigAuthorPic: String,
    createdAt: { type: Date, default: Date.now },
  })
  Gig.index({gigLocation: "text", gigAuthorName: "text", gigTags: "text"})

  return model('Gig', Gig)
}