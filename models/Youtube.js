module.exports = (model, Schema) => {
    const Youtube = new Schema({
        title: String,
        body: String,
        link: String,
        createdAt: { type: Date, default: Date.now },
        userLink: {
          type: Schema.Types.ObjectId, ref: 'User'
        }
    })

    return model('Youtube', Youtube)
}